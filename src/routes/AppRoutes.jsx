import dashboardRoutes from './DashboardRoutes'
import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { RouterProvider } from "react-router/dom";
import LandingPage from "../features/landing page/UI/pages/LandingPage";
import ArenaPreviewPage from "../features/landing page/UI/pages/ArenaPreviewPage";
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
      { path: "/preview/arena/:variant", element: <ArenaPreviewPage /> },
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
