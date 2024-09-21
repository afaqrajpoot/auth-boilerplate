import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { router } from "./Router";
import { AuthProvider } from "./contexts/auth-context";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}
