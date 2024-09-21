import { createBrowserRouter } from "react-router-dom";

import { PAGE_ROUTES } from "@/constants";
import { ProtectedLayout, PublicLayout } from "@/components";
import { LoginPage, RegisterPage, DashboardPage, NoMatchPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: PAGE_ROUTES.HOME,
    element: <ProtectedLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
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
    element: <NoMatchPage />,
  },
]);
