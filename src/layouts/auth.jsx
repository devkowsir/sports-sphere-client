import React from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "../components/logo";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container grow max-w-md flex flex-col justify-center">
        <Logo />
        <div className="divider"></div>
        <Outlet />
      </main>
    </div>
  );
};
