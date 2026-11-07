import dashboardRoutes from './DashboardRoutes'
import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { RouterProvider } from "react-router/dom";
import LandingPage from "../features/landing page/UI/pages/LandingPage";
import AuthLayout from "../features/auth/UI/layouts/AuthLayout";
import LoginPage from "../features/auth/UI/pages/LoginPage";
import RegisterPage from "../features/auth/UI/pages/RegisterPage";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Outlet />
        <ScrollRestoration />
      </>
    ),
    children: [
      ...dashboardRoutes,
      { path: "/", element: <LandingPage /> },
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
