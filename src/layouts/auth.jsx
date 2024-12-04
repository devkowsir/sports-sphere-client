import React from "react";
import { Logo } from "../components/logo";

export const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container grow max-w-md flex flex-col justify-center">
        <Logo />
        <div className="divider"></div>
        {children}
      </main>
    </div>
  );
};
