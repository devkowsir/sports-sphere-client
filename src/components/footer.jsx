import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import React from "react";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
      <div className="container flex flex-col gap-4 justify-between items-center sm:flex-row">
        <aside>
          <Logo className={"[&_.content>p]:text-neutral-content"} />
        </aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a target="_blank" className="text-2xl" href="https://facebook.com">
              <FaFacebook className="hover:text-base-100 transition-colors" />
            </a>
            <a target="_blank" className="text-2xl" href="https://twitter.com">
              <FaTwitter className="hover:text-base-100 transition-colors" />
            </a>
            <a target="_blank" className="text-2xl" href="https://youtube.com">
              <FaYoutube className="hover:text-base-100 transition-colors" />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};
