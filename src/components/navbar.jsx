import React from "react";
import { FaBars, FaMoon, FaRegSun } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { Logo } from "./logo";

export const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="sticky top-0 z-10 shadow-md bg-base-100/50 backdrop-blur-md">
      <nav className="navbar container">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu lg:menu-horizontal">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/all-equipments"}>All Equiments</NavLink>
            </li>
            <li>
              <NavLink to={"/add-equipment"}>Add Equiment</NavLink>
            </li>
            <li>
              <NavLink to={"/my-equipments"}>My Equipments</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex gap-4">
          <label className="swap swap-rotate btn btn-sm sm:btn-md">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="dark" />
            {/* sun icon */}
            <svg
              className="swap-off w-6 aspect-square fill-current sm:w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            {/* moon icon */}
            <svg
              className="swap-on w-6 aspect-square fill-current sm:w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-sm sm:btn-md">
              <FaBars className="text-xl" />
            </div>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/all-equipments"}>All Equiments</NavLink>
              </li>
              <li>
                <NavLink to={"/add-equipment"}>Add Equiment</NavLink>
              </li>
              <li>
                <NavLink to={"/my-equipments"}>My Equipments</NavLink>
              </li>
            </ul>
          </div>
          {user ? (
            <>
              <Link to={"/profile"} className="avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                <div className="w-8 rounded-full sm:w-12">
                  {user.photoURL ? (
                    <img src={user.photoURL} referrerPolicy="no-referrer" alt={user.displayName} />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center bg-neutral text-neutral-content rounded-full">
                      <span className="text-lg sm:text-2xl">
                        {user.displayName
                          .split(" ")
                          .map((part) => part[0].toUpperCase())
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <button className="btn btn-neutral btn-sm sm:btn-md" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/auth/register"} className="btn btn-secondary hidden sm:flex">
                Register
              </Link>
              <Link to={"/auth/login"} className="btn btn-primary">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
