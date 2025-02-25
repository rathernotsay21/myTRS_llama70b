import { json, redirect, type ActionFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { db } from "~/lib/db.server";

// In a real app, you'd have proper form validation and database interactions

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const published = formData.get("published") === "true";
  
  if (!title || title.length < 3) {
    return json({ error: "Title must be at least 3 characters long" });
  }
  
  // Generate a slug from the title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  try {
    const landingPage = await db.landingPage.create({
      data: {
        title,
        slug,
        published,
        content: "", // Empty content for now
      },
    });
    
    return redirect(`/admin/landing-pages/${landingPage.id}/edit`);
  } catch (error) {
    return json({ error: "Failed to create landing page. Please try again." });
  }
};

export default function NewLandingPage() {
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
        Create New Landing Page
      </h1>
      
      <Form method="post" className="mt-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Landing Page Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="e.g., Annual Fundraiser 2025"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          {actionData?.error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{actionData.error}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="published"
            id="published"
            value="true"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Publish this page immediately
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
          >
            {isSubmitting ? "Creating..." : "Create Landing Page"}
          </button>
        </div>
      </Form>
    </div>
  );
}
