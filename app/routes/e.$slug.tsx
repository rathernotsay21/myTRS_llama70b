// This is the public-facing landing page route that visitors will see
import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/lib/db.server";

type LoaderData = {
  landingPage: {
    id: string;
    title: string;
    description: string | null;
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
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  const landingPage = await db.landingPage.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  if (!landingPage) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ landingPage });
};

export default function LandingPage() {
  const { landingPage } = useLoaderData<LoaderData>();

  const buttonClasses = {
    rounded: "rounded-md",
    square: "",
    pill: "rounded-full",
  }[landingPage.buttonStyle];

  return (
    <div style={{ backgroundColor: landingPage.secondaryColor }} className="min-h-screen">
      {landingPage.bannerImageUrl && (
        <div className="relative h-64 md:h-96">
          <img
            src={landingPage.bannerImageUrl}
            alt={landingPage.title}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${landingPage.primaryColor}33, ${landingPage.primaryColor}66)`,
            }}
          />
        </div>
      )}

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: landingPage.primaryColor }}
          >
            {landingPage.title}
          </h1>
          {landingPage.description && (
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-300 sm:mt-4">
              {landingPage.description}
            </p>
          )}

          {landingPage.buttonText && landingPage.buttonLink && (
            <div className="mt-8">
              <a
                href={landingPage.buttonLink}
                className={`inline-flex items-center px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClasses}`}
                style={{ backgroundColor: landingPage.accentColor }}
              >
                {landingPage.buttonText}
              </a>
            </div>
          )}
        </div>

        <div className="mt-12 bg-white bg-opacity-10 rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingPage.eventDate && (
              <div className="text-center">
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: `${landingPage.primaryColor}22` }}
                >
                  <h3
                    className="text-lg font-medium"
                    style={{ color: landingPage.primaryColor }}
                  >
                    Date
                  </h3>
                  <p className="mt-2 text-gray-300">{landingPage.eventDate}</p>
                </div>
              </div>
            )}

            {landingPage.eventTime && (
              <div className="text-center">
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: `${landingPage.primaryColor}22` }}
                >
                  <h3
                    className="text-lg font-medium"
                    style={{ color: landingPage.primaryColor }}
                  >
                    Time
                  </h3>
                  <p className="mt-2 text-gray-300">{landingPage.eventTime}</p>
                </div>
              </div>
            )}

            {landingPage.eventLocation && (
              <div className="text-center">
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: `${landingPage.primaryColor}22` }}
                >
                  <h3
                    className="text-lg font-medium"
                    style={{ color: landingPage.primaryColor }}
                  >
                    Location
                  </h3>
                  <p className="mt-2 text-gray-300">{landingPage.eventLocation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
