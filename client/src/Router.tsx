import { createBrowserRouter } from "react-router-dom";

import NoMatch from "@/pages/NoMatch";
import Dashboard from "@/pages/Dashboard";
import { ProtectedLayout } from "@/components/layouts/AuthLayout";
import { LoginPage } from "./pages";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/auth",
      children: [
        {
          path: "/auth/login",
          element: <LoginPage />,
        },
        {
          path: "/auth/sign-up",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
  {
    basename: global.basename,
  }
);
