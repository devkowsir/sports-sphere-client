import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./logo";
import { Menu } from "lucide-react";

export const Navbar = () => {
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
              <Menu />
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
          <Link to={"/register"} className="btn btn-secondary">
            Register
          </Link>
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};
