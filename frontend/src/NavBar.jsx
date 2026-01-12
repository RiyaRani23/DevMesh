import React from 'react';
import logo from "./assets/logo.png"; 


const NavBar = () => {
  return (
    <div className="navbar sticky top-0 z-50 px-4 sm:px-8 shadow-xl backdrop-blur-md 
                    bg-gradient-to-r from-[#2e1065]/90 via-blue-700/90 to- bg-purple-950/90 
                    border-b border-white/10">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">
       <img 
        src= {logo}  
        alt="DevMesh Logo"
       className="w-24 h-24 object-contain transition-all duration-300 hover:rotate-12 hover:scale-110 "/>
      <span className="text-2xl font-black tracking-tighter text-white">
      Dev<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-400 to-orange-400">Mesh</span>
      </span>
    </a>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar;