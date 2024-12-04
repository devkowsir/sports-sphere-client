import { createBrowserRouter } from "react-router-dom";
import Protected from "../components/protected";
import { AuthLayout } from "../layouts/auth";
import { HomeLayout } from "../layouts/home";
import { LoginRoute } from "./auth/login";
import { RegisterRoute } from "./auth/register";
import ProfileRoute from "./profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "profile",
        element: (
          <Protected>
            <ProfileRoute />
          </Protected>
        ),
      },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginRoute /> },
      { path: "register", element: <RegisterRoute /> },
    ],
  },
]);

export default router;
