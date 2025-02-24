// This route handles duplicating a landing page
import { redirect, type ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ params }) => {
  const { id } = params;
  
  // In a real app, you would:
  // 1. Fetch the source landing page from the database
  // 2. Create a new copy with a different ID and slightly different title/slug
  // 3. Save it to the database
  // 4. Redirect to the edit page for the new landing page
  
  // For now, we'll just redirect to a mock new ID
  const newId = Math.random().toString(36).substring(2, 9);
  
  return redirect(`/admin/landing-pages/${newId}/edit`);
};

// This route doesn't need a default export since it only handles POST requests