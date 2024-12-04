import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/sports-sphere-96.png";
import { cn } from "../lib/utils";

export const Logo = ({ className }) => {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <div className="image w-12">
        <img src={logoImage} className="w-full -mb-[4%]" />
        <div
          className="aspect-[5/1]"
          style={{
            backgroundImage: "radial-gradient(ellipse closest-side, #0009, transparent)",
          }}
        ></div>
      </div>
      <div className="text-xl font-black">
        <span className="text-primary">Sports</span>
        <span className="text-secondary">Sphere</span>
        <p className="text-xs text-neutral/75 font-medium">Gear Up. Play Hard. Win Big.</p>
      </div>
    </Link>
  );
};
