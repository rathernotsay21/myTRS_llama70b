// This is the public-facing landing page route that visitors will see
import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LandingPageHero } from "~/components/landing-page/LandingPageHero";
import { LandingPageSection } from "~/components/landing-page/LandingPageSection";
import { EventInfoSection } from "~/components/landing-page/EventInfoSection";
import { SocialMediaLinks } from "~/components/landing-page/SocialMediaLinks";
import { VolunteerForm } from "~/components/landing-page/VolunteerForm";
import type { LandingPage } from "~/models/landingPage";

// Mock data - in a real app, you'd fetch this from your database based on the slug
const mockLandingPage: Partial<LandingPage> = {
  id: "1",
  title: "Annual Fundraiser 2025",
  subtitle: "Join us for our biggest event of the year!",
  eventInfo: {
    date: "April 15, 2025",
    time: "5:00 PM - 9:00 PM",
    location: "City Convention Center",
    description: "Help us make this year's fundraiser a success by volunteering your time and talents. Whether you're greeting guests, helping with setup, or assisting with the auction, your support makes a difference!"
  },
  socialMedia: [
    { platform: "facebook", url: "https://facebook.com/organization" },
    { platform: "twitter", url: "https://twitter.com/organization" },
    { platform: "instagram", url: "https://instagram.com/organization" }
  ],
  formFields: [
    { id: "name", label: "Full Name", type: "text", required: true },
    { id: "email", label: "Email Address", type: "email", required: true },
    { id: "phone", label: "Phone Number", type: "tel", required: true },
    { 
      id: "availability", 
      label: "Availability", 
      type: "checkbox", 
      required: true,
      options: [
        { value: "setup", label: "Setup (2:00 PM - 5:00 PM)" },
        { value: "event", label: "During Event (5:00 PM - 9:00 PM)" },
        { value: "cleanup", label: "Cleanup (9:00 PM - 11:00 PM)" }
      ]
    },
    { 
      id: "skills", 
      label: "Skills & Interests", 
      type: "select",
      options: [
        { value: "greeting", label: "Guest Greeting" },
        { value: "registration", label: "Registration Desk" },
        { value: "auction", label: "Auction Assistant" },
        { value: "technical", label: "Technical Support" },
        { value: "photography", label: "Event Photography" }
      ]
    },
    { 
      id: "experience", 
      label: "Previous Volunteer Experience", 
      type: "textarea",
      placeholder: "Tell us about any previous volunteer experience you have."
    }
  ],
  primaryButtonText: "Volunteer Now",
  primaryButtonLink: "#volunteer-form",
  logoUrl: "https://via.placeholder.com/150",
  backgroundImageUrl: "https://via.placeholder.com/1920x600"
};

type LoaderData = {
  landingPage: typeof mockLandingPage;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  
  // In a real app, fetch the landing page from your database using the slug
  // If not found, you could return a 404 response
  
  return json({ landingPage: mockLandingPage });
};

export default function LandingPagePublic() {
  const { landingPage } = useLoaderData<LoaderData>();
  
  // Mock icons for event details - in a real app, you'd import proper SVG icons
  const dateIcon = <span>📅</span>;
  const timeIcon = <span>⏰</span>;
  const locationIcon = <span>📍</span>;
  
  return (
    <main>
      <LandingPageHero
        title={landingPage.title || ""}
        subtitle={landingPage.subtitle}
        backgroundImage={landingPage.backgroundImageUrl}
        primaryButtonText={landingPage.primaryButtonText}
        primaryButtonLink={landingPage.primaryButtonLink}
        secondaryButtonText={landingPage.secondaryButtonText}
        secondaryButtonLink={landingPage.secondaryButtonLink}
        logoUrl={landingPage.logoUrl}
        organizationName="Your Organization Name" // This would come from the organization settings
      />
      
      <LandingPageSection variant="secondary" id="event-info">
        <EventInfoSection
          details={[
            { icon: dateIcon, label: "Date", value: landingPage.eventInfo?.date || "" },
            { icon: timeIcon, label: "Time", value: landingPage.eventInfo?.time || "" },
            { icon: locationIcon, label: "Location", value: landingPage.eventInfo?.location || "" }
          ]}
          description={landingPage.eventInfo?.description}
        />
      </LandingPageSection>
      
      <LandingPageSection variant="neutral" id="volunteer-form">
        <VolunteerForm
          fields={landingPage.formFields || []}
          onSubmit={(data) => {
            // In a real app, you'd handle form submission here
            console.log("Form submitted:", data);
            // You might submit to an API endpoint, or use Remix's action
          }}
        />
      </LandingPageSection>
      
      <LandingPageSection variant="primary" id="social-media">
        <SocialMediaLinks
          links={landingPage.socialMedia || []}
        />
      </LandingPageSection>
    </main>
  );
}
