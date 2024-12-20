import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/sports-sphere-96.png";
import { cn } from "../lib/utils";

export const Logo = ({ className }) => {
  return (
    <Link to="/" className={cn("flex items-center gap-2 text-left", className)}>
      <div className="image w-8 sm:w-12">
        <img src={logoImage} className="w-full -mb-[4%]" />
        <div
          className="aspect-[5/1]"
          style={{
            backgroundImage: "radial-gradient(ellipse closest-side, #0009, transparent)",
          }}
        ></div>
      </div>
      <div className="content text-xl font-black hidden sm:block">
        <span className="text-primary">Sports</span>
        <span className="text-secondary">Sphere</span>
        <p className="text-xs text-base-content/75 font-medium">Gear Up. Play Hard. Win Big.</p>
      </div>
    </Link>
  );
};
