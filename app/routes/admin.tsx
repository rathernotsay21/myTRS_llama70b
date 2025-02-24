// app/routes/admin.tsx
import { Outlet } from "@remix-run/react";

export default function AdminLayout() {
  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Admin Dashboard
          </h1>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}