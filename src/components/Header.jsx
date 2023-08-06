import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="navbar bg-base-900 text-slate-500">
        
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          <i className="fa-solid fa-infinity text-xl text-rose-500"></i>Pixy Notes</Link>
      </div>
      <div className="navbar-end">
      <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Go to Notes</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      </div>
    
  );
}
