import React from 'react'; 
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

import { DEFAULT_PHOTO_URL } from '../utils/constants';
import logo from "../assets/logo.png";

const NavBar = () => {
   const user = useSelector(store => store.user);
   console.log("NAVBAR USER:", user);

  return (
    <div className="navbar bg-base-300 shadow-2xl">
   <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">
       <img 
        src={logo}  
        alt="DevMesh Logo"
        className="w-24 h-24 object-contain transition-all duration-700 hover:[transform:rotateY(180deg)] hover:scale-110 drop-shadow-2xl"
      />
      <span className="text-2xl font-black tracking-tighter text-white">
      Dev<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-400 to-orange-400">Mesh</span>
      </span>
    </Link>
  </div>
   { user && (
    <div className="flex items-center gap-4 mx-5">
    <div className="hidden md:block text-right">
      <p className="text-xs opacity-60 font-bold uppercase tracking-widest">Welcome</p>
      <p className="text-sm font-bold text-white">{user.firstName}</p>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
                    alt="User Photo"
                    src={user.photoUrl || DEFAULT_PHOTO_URL}
                    onError={(e) => {
                      e.target.src = DEFAULT_PHOTO_URL;
                    }}
                  />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
        <Link to="/profile" className="justify-between py-3">
        <span className="flex items-center gap-2">
         👨‍💻Profile
        </span>
       <span className="badge badge-primary badge-sm">New</span>
       </Link>
       </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
)}
</div>
  )
}

export default NavBar;