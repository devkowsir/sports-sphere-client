import { createBrowserRouter } from "react-router-dom";
import { HomeLaout } from "../layouts/home";

const router = createBrowserRouter([{ path: "/", element: <HomeLaout /> }]);

export default router;
