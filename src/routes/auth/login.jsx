import React, { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaKey } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthLayout } from "../../layouts/auth";
import { SiteName } from "../../config";
import { useAuthContext } from "../../contexts/auth";
import { isValidEmail, isValidPassword } from "../../utils/input-validator";

export const LoginRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, loginWithGoogle, sendPasswordResetEmail } = useAuthContext();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [mode, setMode] = useState("login");

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.email.value.trim();
      const password = e.target.password?.value.trim();

      if (!isValidEmail(email)) return;
      if (mode == "login" && !isValidPassword(password)) return;

      if (mode == "login") await loginUser({ email, password });
      else await sendPasswordResetEmail(email);

      if (mode == "login") {
        const searchParams = new URLSearchParams(location.search);
        let redirectTo = new URL(searchParams.get("redirectTo") ?? "/", window.location.origin).pathname;
        if (!redirectTo.startsWith("/")) redirectTo = "/";
        navigate(redirectTo, { replace: true });
      } else window.open("https://mail.google.com", "_blank");

      toast(mode == "login" ? "Successfully logged in." : "An email has been sent to your mail account.", {
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) toast(error.message, { type: "error" });
      else console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();

      const searchParams = new URLSearchParams(location.search);
      let redirectTo = new URL(searchParams.get("redirectTo") ?? "/", window.location.origin).pathname;
      if (!redirectTo.startsWith("/")) redirectTo = "/";
      navigate(redirectTo, { replace: true });

      toast("Successfully logged in.", {
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) toast(error.message, { type: "error" });
      else console.error(error);
    }
  };

  useEffect(() => {
    document.title = `${SiteName} | ${mode[0].toUpperCase() + mode.slice(1)}`;
  }, [mode]);

  return (
    <AuthLayout>
      <h1 className="mb-8 text-center text-3xl font-semibold sm:text-4xl">{mode == "login" ? "Login" : "Reset"}</h1>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <FaEnvelope />
          <input name="email" type="email" className="grow" placeholder="Email" />
        </label>
        {mode == "login" ? (
          <label className="input input-bordered flex items-center gap-2">
            <FaKey />
            <input
              name="password"
              type={isPasswordShown ? "text" : "password"}
              className="grow"
              placeholder="Password"
            />
            {isPasswordShown ? (
              <FaEye className="cursor-pointer" onClick={() => setIsPasswordShown(false)} />
            ) : (
              <FaEyeSlash className="cursor-pointer" onClick={() => setIsPasswordShown(true)} />
            )}
          </label>
        ) : null}
        <button className="btn btn-primary w-full text-lg cursor-pointer">{mode == "login" ? "Login" : "Reset"}</button>
      </form>
      <p className="mt-4 text-center">
        {mode == "login" ? "Forgot your password? " : "Remember password? "}
        <button className="text-secondary" onClick={() => setMode(mode == "login" ? "reset" : "login")}>
          {mode == "login" ? "Reset" : "Login"}
        </button>
      </p>
      <div className="divider my-8">OR</div>
      <button onClick={handleGoogleLogin} className="mb-4 btn btn-outline w-full text-base-content/75">
        <FaGoogle />
        <span>Login with Google</span>
      </button>
      <p className="text-center">
        Don't have an account?{" "}
        <Link className="text-secondary" to={{ pathname: "/register" }} replace>
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};
