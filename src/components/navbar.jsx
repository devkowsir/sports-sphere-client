import React from "react";
import { FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";
import { Logo } from "./logo";

export const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="sticky top-0 z-10 shadow-md">
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
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn m-1">
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
              <Link to={"/auth/register"} className="btn btn-secondary">
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
