import React, { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaImage, FaKey, FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SiteName } from "../../config";
import { useAuthContext } from "../../contexts/auth";
import { addUser } from "../../lib/db";
import { isValidEmail, isValidName, isValidPassword, isValidPhotoURL } from "../../utils/input-validator";

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { registerUser, updateProfile, reloadUser, loginWithGoogle } = useAuthContext();

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const displayName = e.target.name.value.trim();
      const photoURL = e.target["photo-url"].value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value.trim();

      if (!isValidName(displayName)) return;
      if (photoURL.length && !(await isValidPhotoURL(photoURL))) return;
      if (!isValidEmail(email)) return;
      if (!isValidPassword(password)) return;

      await registerUser({ email, password });
      await updateProfile({ displayName, photoURL });
      reloadUser();
      await addUser({ displayName, email, photoURL });

      const searchParams = new URLSearchParams(location.search);
      let redirectTo = new URL(searchParams.get("redirectTo") ?? "/", window.location.origin).pathname;
      if (!redirectTo.startsWith("/")) redirectTo = "/";
      navigate(redirectTo, { replace: true });

      toast("Successfully logged in.", {
        type: "success",
      });
    } catch (error) {
      if (error.message || error.msg) toast(error.message || error.msg, { type: "error" });
      console.error(error.message, error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const {
        user: { displayName, email, photoURL },
      } = await loginWithGoogle();
      await addUser({ displayName, email, photoURL });

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
    document.title = `${SiteName} | Register`;
  }, []);

  return (
    <>
      <h1 className="mb-8 text-center text-3xl font-semibold sm:text-4xl">Register</h1>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input name="name" type="text" className="grow" placeholder="Name" required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaImage />
          <input name="photo-url" type="text" className="grow" placeholder="Photo URL" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaEnvelope />
          <input name="email" type="email" className="grow" placeholder="Email" required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            name="password"
            type={isPasswordShown ? "text" : "password"}
            className="grow"
            placeholder="Password"
            required
          />
          {isPasswordShown ? (
            <FaEye className="cursor-pointer" onClick={() => setIsPasswordShown(false)} />
          ) : (
            <FaEyeSlash className="cursor-pointer" onClick={() => setIsPasswordShown(true)} />
          )}
        </label>
        <button className="btn btn-primary w-full text-lg cursor-pointer">Register</button>
      </form>
      <div className="divider my-8">OR</div>
      <button onClick={handleGoogleLogin} className="mb-4 btn btn-outline w-full text-base-content/75">
        <FaGoogle />
        <span>Login with Google</span>
      </button>
      <p className="text-center">
        Already have an account?{" "}
        <Link className="text-secondary" to={{ pathname: "/auth/login" }} replace>
          Login
        </Link>
      </p>
    </>
  );
};
