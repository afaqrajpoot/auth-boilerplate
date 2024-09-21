import { useAuthContext } from "@/contexts";
import { Navigate, Outlet } from "react-router-dom";
import { PAGE_ROUTES } from "@/constants";
import { Footer, Header } from "@/components";

export const ProtectedLayout = () => {
  const { userInfo } = useAuthContext();

  // Check if the user is authenticated
  if (!userInfo?.token) {
    // If not authenticated, redirect to the login page
    return <Navigate to={PAGE_ROUTES.AUTH.LOGIN} />;
  }

  // If authenticated, render the child routes
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col">
        <div className="container px-4 md:px-8 flex-grow flex flex-col">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
