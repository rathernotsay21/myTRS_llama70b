import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { LandingPageHero } from "~/components/landing-page/LandingPageHero";
import { LandingPageSection } from "~/components/landing-page/LandingPageSection";
import { EventInfoSection } from "~/components/landing-page/EventInfoSection";
import { SocialMediaLinks } from "~/components/landing-page/SocialMediaLinks";
import { VolunteerForm } from "~/components/landing-page/VolunteerForm";
import type { LandingPage } from "~/models/landingPage";

// Same mock data as in the edit route
const mockLandingPage: Partial<LandingPage> = {
  id: "1",
  organizationId: "org123",
  title: "Annual Fundraiser 2025",
  subtitle: "Join us for our biggest event of the year!",
  slug: "annual-fundraiser-2025",
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
  theme: {
    primaryColor: "#3B82F6", // blue-500
    secondaryColor: "#1F2937", // gray-800
    accentColor: "#F59E0B", // amber-500
    fontFamily: "Inter, sans-serif",
    buttonStyle: "rounded"
  },
  primaryButtonText: "Volunteer Now",
  primaryButtonLink: "#volunteer-form",
  secondaryButtonText: "Learn More",
  secondaryButtonLink: "#event-info",
  logoUrl: "https://via.placeholder.com/150",
  backgroundImageUrl: "https://via.placeholder.com/1920x600",
  published: false,
  createdAt: new Date("2025-01-15"),
  updatedAt: new Date("2025-01-20")
};

type LoaderData = {
  landingPage: typeof mockLandingPage;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  
  // In a real app, fetch the landing page from your database using the id
  // If not found, you could return a 404 response
  
  return json({ landingPage: mockLandingPage });
};

export default function PreviewLandingPage() {
  const { landingPage } = useLoaderData<LoaderData>();
  
  // Mock icons for event details - in a real app, you'd import proper SVG icons
  const dateIcon = <span>📅</span>;
  const timeIcon = <span>⏰</span>;
  const locationIcon = <span>📍</span>;
  
  // Apply custom theme styles
  const customStyles = {
    "--primary-color": landingPage.theme?.primaryColor,
    "--secondary-color": landingPage.theme?.secondaryColor,
    "--accent-color": landingPage.theme?.accentColor,
    "--font-family": landingPage.theme?.fontFamily
  } as React.CSSProperties;
  
  // Get button classes based on theme
  const getButtonClasses = (isPrimary: boolean) => {
    const style = landingPage.theme?.buttonStyle || "rounded";
    
    const roundedStyles = {
      rounded: "rounded-md",
      square: "rounded-none",
      pill: "rounded-full"
    }[style];
    
    if (isPrimary) {
      return `${roundedStyles} bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`;
    } else {
      return `${roundedStyles} border border-gray-300 bg-white px-6 py-3 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700`;
    }
  };
  
  return (
    <div>
      {/* Preview Toolbar */}
      <div className="sticky top-0 z-50 bg-white px-4 py-2 shadow dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-4 font-medium text-gray-900 dark:text-white">
              Preview Mode
            </span>
            <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Not Published
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Device preview toggles - you could implement responsive preview modes */}
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                className="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Desktop
              </button>
              <button
                type="button"
                className="inline-flex items-center border-t border-b border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Tablet
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Mobile
              </button>
            </div>
            
            <Link
              to={`/admin/landing-pages/${landingPage.id}/edit`}
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Page
            </Link>
          </div>
        </div>
      </div>
      
      {/* Landing page preview */}
      <div style={customStyles}>
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
                // This is just a preview, so we'll log the data instead of submitting
                console.log("Preview mode - form data:", data);
                alert("This is a preview only. Form submissions are disabled in preview mode.");
              }}
            />
          </LandingPageSection>
          
          <LandingPageSection variant="primary" id="social-media">
            <SocialMediaLinks
              links={landingPage.socialMedia || []}
            />
          </LandingPageSection>
        </main>
      </div>
    </div>
  );
}
