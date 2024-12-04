import { createBrowserRouter } from "react-router-dom";
import { LoginRoute } from "./auth/login";
import { RegisterRoute } from "./auth/register";
import { HomeRoute } from "./home";

const router = createBrowserRouter([
  { path: "/", element: <HomeRoute /> },
  { path: "/login", element: <LoginRoute /> },
  { path: "/register", element: <RegisterRoute /> },
]);

export default router;
