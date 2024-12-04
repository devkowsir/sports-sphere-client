import { createBrowserRouter } from "react-router-dom";
import Protected from "../components/protected";
import { LoginRoute } from "./auth/login";
import { RegisterRoute } from "./auth/register";
import { HomeRoute } from "./home";
import ProfileRoute from "./profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
    children: [
      {
        path: "profile",
        element: (
          <Protected>
            <ProfileRoute />
          </Protected>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginRoute /> },
  { path: "/register", element: <RegisterRoute /> },
]);

export default router;
