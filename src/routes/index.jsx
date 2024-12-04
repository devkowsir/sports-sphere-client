import { createBrowserRouter } from "react-router-dom";
import { LoginRoute } from "./auth/login";
import { HomeRoute } from "./home";

const router = createBrowserRouter([
  { path: "/", element: <HomeRoute /> },
  { path: "/login", element: <LoginRoute /> },
]);

export default router;
