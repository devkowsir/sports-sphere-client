import { createBrowserRouter } from "react-router-dom";
import { Protected } from "../components/protected";
import { AuthLayout } from "../layouts/auth";
import { HomeLayout } from "../layouts/home";
import { AllEquipmentsRoute } from "./all-equipments";
import { LoginRoute } from "./auth/login";
import { RegisterRoute } from "./auth/register";
import { HomeRoute } from "./home";
import { ProfileRoute } from "./profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "", element: <HomeRoute /> },
      { path: "all-equipments", element: <AllEquipmentsRoute /> },
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
