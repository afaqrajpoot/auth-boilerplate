import { useAuthContext } from "@/contexts/auth-context";
import { Navigate, Outlet } from "react-router-dom";

import { PAGE_ROUTES } from "@/constants/api-routes";

export const PublicLayout = () => {
  const { userInfo } = useAuthContext();

  // Check if the user is authenticated
  if (userInfo?.token) {
    // If  authenticated, redirect to the Home page
    return <Navigate to={PAGE_ROUTES.HOME} />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
