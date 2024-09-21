import { useAuthContext } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const ProtectedLayout = () => {
  const { userInfo } = useAuthContext();

  // Check if the user is authenticated
  if (!userInfo?.token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/auth/login" />;
  }

  // If authenticated, render the child routes
  return (
    <>
      <Header />
      <div className="flex-grow flex flex-col">
        <div className="container px-4 md:px-8 flex-grow flex flex-col">
          <Outlet />
        </div>
      </div>
      <div className="container bottom-0 px-4 md:px-8">
        <Footer />
      </div>
    </>
  );
};
