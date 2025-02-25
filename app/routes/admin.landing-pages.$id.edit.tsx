// app/routes/admin.landing-pages.$id.edit.tsx
import { json, redirect, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { db } from "~/lib/db.server";

type LoaderData = {
  landingPage: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    published: boolean;
    eventDate: string | null;
    eventTime: string | null;
    eventLocation: string | null;
    buttonText: string | null;
    buttonLink: string | null;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    buttonStyle: string;
    bannerImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  
  const landingPage = await db.landingPage.findUnique({
    where: { id },
  });

  if (!landingPage) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ landingPage });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  
  const updates = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string || null,
    published: formData.get("published") === "true",
    eventDate: formData.get("eventDate") as string || null,
    eventTime: formData.get("eventTime") as string || null,
    eventLocation: formData.get("eventLocation") as string || null,
    buttonText: formData.get("buttonText") as string || null,
    buttonLink: formData.get("buttonLink") as string || null,
    primaryColor: (formData.get("primaryColor") as string) || "#3B82F6",
    secondaryColor: (formData.get("secondaryColor") as string) || "#1F2937",
    accentColor: (formData.get("accentColor") as string) || "#F59E0B",
    buttonStyle: (formData.get("buttonStyle") as string) || "rounded",
    bannerImageUrl: formData.get("bannerImageUrl") as string || null,
  };
  
  // Validate the slug format
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(updates.slug)) {
    return json({
      error: "URL must contain only lowercase letters, numbers, and hyphens"
    }, { status: 400 });
  }
  
  try {
    // Check if slug is unique (excluding current page)
    const existingPage = await db.landingPage.findFirst({
      where: {
        slug: updates.slug,
        id: { not: id }
      }
    });

    if (existingPage) {
      return json({
        error: "This URL is already taken. Please choose a different one."
      }, { status: 400 });
    }

    // Update the landing page
    await db.landingPage.update({
      where: { id },
      data: updates,
    });
    
    return redirect(`/admin/landing-pages`);
  } catch (error) {
    console.error('Failed to update landing page:', error);
    return json({
      error: error instanceof Error ? error.message : "Failed to update landing page. Please try again."
    }, { status: 500 });
  }
};

export default function EditLandingPage() {
  const { landingPage } = useLoaderData<LoaderData>();
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [title, setTitle] = useState(landingPage.title);
  const [slug, setSlug] = useState(landingPage.slug);
  const [description, setDescription] = useState(landingPage.description || "");
  const [published, setPublished] = useState(landingPage.published);
  const [eventDate, setEventDate] = useState(landingPage.eventDate || "");
  const [eventTime, setEventTime] = useState(landingPage.eventTime || "");
  const [eventLocation, setEventLocation] = useState(landingPage.eventLocation || "");
  const [buttonText, setButtonText] = useState(landingPage.buttonText || "");
  const [buttonLink, setButtonLink] = useState(landingPage.buttonLink || "");
  const [primaryColor, setPrimaryColor] = useState(landingPage.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(landingPage.secondaryColor);
  const [accentColor, setAccentColor] = useState(landingPage.accentColor);
  const [buttonStyle, setButtonStyle] = useState(landingPage.buttonStyle);
  const [bannerImageUrl, setBannerImageUrl] = useState(landingPage.bannerImageUrl || "");

  // Auto-generate slug from title if slug is empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!slug) {
      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Form method="post" className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
              Edit Landing Page
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  value="true"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="published" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Published
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="slug"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            {actionData?.error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{actionData.error}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <div className="mt-1">
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Date
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="eventDate"
                  id="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Time
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="eventTime"
                  id="eventTime"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Location
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="eventLocation"
                id="eventLocation"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Button Text
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="buttonText"
                  id="buttonText"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Button Link
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="buttonLink"
                  id="buttonLink"
                  value={buttonLink}
                  onChange={(e) => setButtonLink(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Theme Options</h2>
            
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Primary Color
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    name="primaryColor"
                    id="primaryColor"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-8 w-8 rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secondary Color
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    name="secondaryColor"
                    id="secondaryColor"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="h-8 w-8 rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Accent Color
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    name="accentColor"
                    id="accentColor"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="h-8 w-8 rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="buttonStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Button Style
                </label>
                <div className="mt-1">
                  <select
                    name="buttonStyle"
                    id="buttonStyle"
                    value={buttonStyle}
                    onChange={(e) => setButtonStyle(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="rounded">Rounded</option>
                    <option value="square">Square</option>
                    <option value="pill">Pill</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bannerImageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Banner Image URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="bannerImageUrl"
                    id="bannerImageUrl"
                    value={bannerImageUrl}
                    onChange={(e) => setBannerImageUrl(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
