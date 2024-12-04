import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth";
import router from "./routes";

import "react-toastify/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" />
    </AuthProvider>
  );
}

export default App;
