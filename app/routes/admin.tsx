// app/routes/admin.tsx
import { Link, Outlet, useLocation } from "@remix-run/react";

const navigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Landing Pages", href: "/admin/landing-pages" },
  // Add more admin navigation items here
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Admin Portal
              </h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <header className="bg-white shadow dark:bg-gray-800">
            <div className="px-8 py-6">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {navigation.find((item) => item.href === location.pathname)?.name || "Admin Dashboard"}
              </h1>
            </div>
          </header>
          <main className="p-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}