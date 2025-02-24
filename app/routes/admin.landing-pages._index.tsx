import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

// Mock data for now - in a real app you'd fetch from your database
const mockLandingPages = [
  {
    id: "1",
    title: "Annual Fundraiser 2025",
    slug: "annual-fundraiser-2025",
    published: true,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-20"),
  },
  {
    id: "2",
    title: "Summer Volunteer Drive",
    slug: "summer-volunteer-drive",
    published: false,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
  },
];

type LoaderData = {
  landingPages: typeof mockLandingPages;
};

export const loader: LoaderFunction = async () => {
  // In a real app, fetch landing pages from your database
  return json({ landingPages: mockLandingPages });
};

export default function LandingPagesIndex() {
  const { landingPages } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
            Landing Pages
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Create and manage landing pages for your volunteer events
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/admin/landing-pages/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create New Landing Page
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                URL
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Last Updated
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {landingPages.map((page) => (
              <tr key={page.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {page.title}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    /{page.slug}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      page.published
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {page.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                {typeof page.updatedAt === 'string' 
                  ? new Date(page.updatedAt).toLocaleDateString()
                  : page.updatedAt instanceof Date 
                  ? page.updatedAt.toLocaleDateString()
                  : 'Unknown date'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Link
                    to={`/admin/landing-pages/${page.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </Link>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                  <Link
                    to={`/admin/landing-pages/${page.id}/preview`}
                    className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Preview
                  </Link>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                  <Link
                    to={`/e/${page.slug}`}
                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                    target="_blank"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}