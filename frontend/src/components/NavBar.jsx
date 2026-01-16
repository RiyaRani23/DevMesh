import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_PHOTO_URL } from '../utils/constants';
import logo from "../assets/logo.png";
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';


const NavBar = () => {
   const user = useSelector(store => store.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = async() => {
    try{
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
      dispatch(removeUser());
      return navigate("/login");
    }catch(err){
      console.error(err);
    }
  }

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
   { user ? (
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
  tabIndex={0}
  className="menu menu-sm dropdown-content mt-4 z-[100] w-60 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#0f172a]/95 backdrop-blur-xl rounded-xl border border-slate-700/50 ring-1 ring-white/10"
>
  {/* User Brief Info */}
  <div className="px-4 py-3 mb-2 border-b border-slate-700/50">
    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Developer</p>
    <p className="text-sm font-bold text-emerald-500 truncate">{user?.firstName} {user?.lastName}</p>
  </div>

  <li className="mb-1">
    <Link 
      to="/profile" 
      className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-800 transition-all group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-70 group-hover:text-primary transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      <span className="font-medium">Edit Profile</span>
    </Link>
  </li>

  <li className="mb-1">
    <Link 
      to="/connections" 
      className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-800 transition-all group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-70 group-hover:text-primary transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a5.97 5.97 0 0 0-.942 3.197m0 0a5.997 5.997 0 0 0 1.51 3.77M12 12.75a3.375 3.375 0 1 1 0-6.75 3.375 3.375 0 0 1 0 6.75Zm6.292 2.046a4.5 4.5 0 1 1-6.745-3.515M12 12.75a4.5 4.5 0 1 1-5.38-3.515" />
      </svg>
      <span className="font-medium">Connections</span>
    </Link>
  </li>

  <li className="mb-1">
    <Link 
      to="/requests" 
      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-slate-800 transition-all group"
    >
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-70 group-hover:text-primary transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        <span className="font-medium">Requests</span>
      </div>
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
    </Link>
  </li>

  <div className="h-px bg-slate-700/50 my-2"></div>

  <li>
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-slate-400 hover:text-error hover:bg-error/5 transition-all group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-70 group-hover:text-error">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
      </svg>
      <span className="font-bold">Sign out</span>
    </button>
  </li>
</ul>
    </div>
  </div>
  ) : (
        <div className="flex items-center gap-3 mx-5">
          <Link to="/login" className="btn btn-ghost text-white font-bold">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary font-bold px-6">
            Signup
          </Link>
        </div>
)}
</div>
  )
}

export default NavBar;