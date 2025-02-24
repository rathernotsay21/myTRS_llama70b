// This file provides examples of database integration for the landing page feature
// You can adapt these to your specific database technology (PostgreSQL, MySQL, MongoDB, etc.)

// Example database service using a SQL database with Prisma ORM
// app/services/landingPageService.ts

import { PrismaClient } from '@prisma/client';
import type { LandingPage, LandingPageFormField } from '~/models/landingPage';

const prisma = new PrismaClient();

export async function getLandingPages(organizationId: string) {
  return prisma.landingPage.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function getLandingPageById(id: string) {
  return prisma.landingPage.findUnique({
    where: {
      id,
    },
  });
}

export async function getLandingPageBySlug(slug: string) {
  return prisma.landingPage.findFirst({
    where: {
      slug,
      published: true,
    },
  });
}

export async function createLandingPage(data: Partial<LandingPage>) {
  return prisma.landingPage.create({
    data: {
      title: data.title!,
      subtitle: data.subtitle || null,
      slug: data.slug!,
      organizationId: data.organizationId!,
      eventInfo: data.eventInfo as any,
      formFields: data.formFields as any,
      socialMedia: data.socialMedia as any,
      theme: data.theme as any,
      logoUrl: data.logoUrl || null,
      backgroundImageUrl: data.backgroundImageUrl || null,
      primaryButtonText: data.primaryButtonText || null,
      primaryButtonLink: data.primaryButtonLink || null,
      secondaryButtonText: data.secondaryButtonText || null,
      secondaryButtonLink: data.secondaryButtonLink || null,
      published: data.published || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function updateLandingPage(id: string, data: Partial<LandingPage>) {
  return prisma.landingPage.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      eventInfo: data.eventInfo as any,
      formFields: data.formFields as any,
      socialMedia: data.socialMedia as any,
      theme: data.theme as any,
      logoUrl: data.logoUrl,
      backgroundImageUrl: data.backgroundImageUrl,
      primaryButtonText: data.primaryButtonText,
      primaryButtonLink: data.primaryButtonLink,
      secondaryButtonText: data.secondaryButtonText,
      secondaryButtonLink: data.secondaryButtonLink,
      published: data.published,
      updatedAt: new Date(),
    },
  });
}

export async function duplicateLandingPage(id: string, newTitle: string) {
  const original = await getLandingPageById(id);
  
  if (!original) {
    throw new Error('Landing page not found');
  }
  
  // Generate a new slug based on the new title
  const newSlug = newTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Create a duplicate with a new ID and updated title/slug
  return createLandingPage({
    ...original,
    id: undefined, // Let the database generate a new ID
    title: newTitle,
    slug: newSlug,
    published: false, // Always start as unpublished
    createdAt: undefined,
    updatedAt: undefined,
  });
}

export async function deleteLandingPage(id: string) {
  return prisma.landingPage.delete({
    where: {
      id,
    },
  });
}

export async function saveFormSubmission(landingPageId: string, formData: Record<string, any>) {
  return prisma.formSubmission.create({
    data: {
      landingPageId,
      submissionData: formData as any,
      createdAt: new Date(),
    },
  });
}

export async function getFormSubmissions(landingPageId: string) {
  return prisma.formSubmission.findMany({
    where: {
      landingPageId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// Example Prisma schema
// prisma/schema.prisma

/*
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Organization {
  id          String        @id @default(uuid())
  name        String
  slug        String        @unique
  landingPages LandingPage[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model LandingPage {
  id                  String            @id @default(uuid())
  organizationId      String
  organization        Organization      @relation(fields: [organizationId], references: [id])
  title               String
  subtitle            String?
  slug                String
  eventInfo           Json
  formFields          Json
  socialMedia         Json
  theme               Json
  logoUrl             String?
  backgroundImageUrl  String?
  primaryButtonText   String?
  primaryButtonLink   String?
  secondaryButtonText String?
  secondaryButtonLink String?
  published           Boolean           @default(false)
  formSubmissions     FormSubmission[]
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt

  @@unique([organizationId, slug])
}

model FormSubmission {
  id             String      @id @default(uuid())
  landingPageId  String
  landingPage    LandingPage @relation(fields: [landingPageId], references: [id])
  submissionData Json
  createdAt      DateTime    @default(now())
}
*/

// Example integration in a route file
// app/routes/admin.landing-pages._index.tsx

import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getLandingPages } from "~/services/landingPageService";
import { requireOrgAdmin } from "~/services/auth.server";

type LoaderData = {
  landingPages: Awaited<ReturnType<typeof getLandingPages>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  // Check if user is authenticated and has permission
  const { organizationId } = await requireOrgAdmin(request);
  
  // Get landing pages for the organization
  const landingPages = await getLandingPages(organizationId);
  
  return json({ landingPages });
};

// Example integration in a route file with form handling
// app/routes/e.$slug.tsx

import { json, redirect, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { getLandingPageBySlug, saveFormSubmission } from "~/services/landingPageService";
import { LandingPageHero } from "~/components/landing-page/LandingPageHero";
import { LandingPageSection } from "~/components/landing-page/LandingPageSection";
import { EventInfoSection } from "~/components/landing-page/EventInfoSection";
import { SocialMediaLinks } from "~/components/landing-page/SocialMediaLinks";
import { VolunteerForm } from "~/components/landing-page/VolunteerForm";

type LoaderData = {
  landingPage: Awaited<ReturnType<typeof getLandingPageBySlug>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }
  
  const landingPage = await getLandingPageBySlug(slug);
  
  if (!landingPage) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return json({ landingPage });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { slug } = params;
  
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }
  
  const landingPage = await getLandingPageBySlug(slug);
  
  if (!landingPage) {
    throw new Response("Not Found", { status: 404 });
  }
  
  // Process form submission
  const formData = await request.formData();
  const submissionData = Object.fromEntries(formData);
  
  // Validate form data
  const errors = validateFormSubmission(submissionData, landingPage.formFields);
  
  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }
  
  // Save form submission
  await saveFormSubmission(landingPage.id, submissionData);
  
  // Redirect to thank you page
  return redirect(`/e/${slug}/thank-you`);
};

// Helper function to validate form submissions
function validateFormSubmission(
  data: Record<string, any>,
  formFields: LandingPageFormField[]
) {
  const errors: Record<string, string> = {};
  
  for (const field of formFields) {
    if (field.required && !data[field.id]) {
      errors[field.id] = `${field.label} is required`;
    }
    
    // Add more validation as needed (e.g., email format)
    if (field.type === 'email' && data[field.id] && !validateEmail(data[field.id])) {
      errors[field.id] = 'Please enter a valid email address';
    }
  }
  
  return errors;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Example file upload service
// app/services/fileUploadService.ts

import { writeFile } from 'fs/promises';
import { createId } from '@paralleldrive/cuid2';
import { uploadToS3 } from './s3'; // You would need to implement this

export async function saveUploadedFile(file: File, directory: string) {
  // Option 1: Save locally (for development)
  const filename = `${createId()}-${file.name}`;
  const path = `public/uploads/${directory}/${filename}`;
  
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path, buffer);
  
  return `/uploads/${directory}/${filename}`;
  
  // Option 2: Save to S3 (for production)
  // const key = `${directory}/${createId()}-${file.name}`;
  // const url = await uploadToS3(file, key);
  // return url;
}

// Example middleware for authentication
// app/services/auth.server.ts

import { json, redirect } from "@remix-run/node";
import { getSession } from "~/services/session.server";

export async function requireOrgAdmin(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  
  if (!userId) {
    throw redirect("/login");
  }
  
  // Get user's organization and role
  const user = await getUserWithOrganization(userId);
  
  if (!user || !user.organizationId || user.role !== "admin") {
    throw json({ error: "Unauthorized" }, { status: 403 });
  }
  
  return { organizationId: user.organizationId, userId };
}

// You would need to implement this function
async function getUserWithOrganization(userId: string) {
  // Fetch user with organization from your database
  // return { id: userId, organizationId: 'org123', role: 'admin' };
}
