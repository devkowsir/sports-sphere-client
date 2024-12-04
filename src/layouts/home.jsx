import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
