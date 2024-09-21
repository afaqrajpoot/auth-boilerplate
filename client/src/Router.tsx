import { createBrowserRouter } from "react-router-dom";

import NoMatch from "@/pages/NoMatch";
import Dashboard from "@/pages/Dashboard";
import { ProtectedLayout } from "@/components/layouts/AuthLayout";
import { LoginPage, RegisterPage } from "./pages";
import { PAGE_ROUTES } from "./constants/API_ROUTES";
import { PublicLayout } from "./components/layouts/PublicLayout";

export const router = createBrowserRouter(
  [
    {
      path: PAGE_ROUTES.HOME,
      element: <ProtectedLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
      ],
    },
    {
      element: <PublicLayout />,
      children: [
        {
          path: PAGE_ROUTES.AUTH.LOGIN,
          element: <LoginPage />,
        },
        {
          path: PAGE_ROUTES.AUTH.REGISTER,
          element: <RegisterPage />,
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
