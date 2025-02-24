// app/routes/admin.landing-pages.tsx
import { Outlet } from "@remix-run/react";

export default function AdminLandingPagesLayout() {
  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <Outlet />
      </div>
    </div>
  );
}