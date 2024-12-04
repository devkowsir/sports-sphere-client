import React from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const HomeLaout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow"></main>
      <Footer />
    </div>
  );
};
