import React from "react";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";



const Login = () => {

    const [emailId, setEmailId] = useState("Khushi1404@gmail.com");
    const [password, setPassword] = useState("Khushi1404@");
     const dispatch = useDispatch();
     const navigate = useNavigate();
      const [error, setError] = useState("");

    const handleLogin = async () => {
      try {
        const res = await axios.post(
          BASE_URL + "/login",
         {
            emailId: emailId.trim(),
             password: password.trim(),
         },
         {
             withCredentials: true,
        }
        );
        dispatch(addUser(res.data));
        navigate("/feed");
      }  catch(err){
            setError(err.response?.data?.message || err.response?.data || "Invalid email or password");
        } 
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral relative overflow-hidden">
     
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      
      <div className="card w-full max-w-md bg-base-100/80 backdrop-blur-lg shadow-2xl border border-white/10 z-10 m-4">
        <div className="card-body p-8">
        
          <div className="flex flex-col items-center mb-8">
            <div className="avatar mb-4">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl">
                <img 
                      src={logo}  
                      alt="DevMesh Logo"
                      className="w-32 h-32 object-contain rounded-2xl transition-all duration-700 bg-white
                      hover:[transform:rotateY(180deg)] hover:scale-110 drop-shadow-2xl"
                />
              </div>
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-base-content">
              DEV<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-400
               to-orange-400">MESH</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-orange-500 mt-1 rounded-full"></div>
            <p className="text-xs uppercase tracking-[0.2em] mt-2 opacity-60 font-bold">Connect & Build</p>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Developer Email</span>
            </label>
            <input 
              type="email" 
              placeholder="abcd@devmesh.com" 
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full bg-base-200/50 focus:input-primary transition-all shadow-inner" 
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text font-bold">Password</span>
              <span className="label-text-alt link link-hover text-primary font-medium">Forgot Password?</span>
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-base-200/50 focus:input-primary transition-all shadow-inner" 
            />
          </div>
          {error && (
            <div className="mt-6 p-4 bg-black/60 border-l-4 border-error rounded-r-lg shadow-[0_0_15px_rgba(255,0,0,0.1)] animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-error animate-pulse shadow-[0_0_8px_#ff0000]"></span>
               <div className="flex flex-col gap-1">
                <p className="text-sm font-mono text-error leading-relaxed">
                {error}
                  </p>
              </div>
            </div>
          </div>
          )}
          <div className="card-actions mt-10">
            <button onClick={handleLogin} className="btn btn-primary w-full group relative overflow-hidden border-none shadow-xl 
            hover:shadow-blue-500/40 transition-all text-white">
              <span className="relative z-10 font-bold uppercase tracking-widest" onClick={handleLogin}>Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-orange-500 opacity-90 group-hover:opacity-100 
              transition-opacity"></div>
            </button>
          </div>
          
          <div className="divider text-xs opacity-50 uppercase tracking-widest mt-8">New to the network?</div>
          
          <button className="btn btn-outline btn-block hover:bg-base-200 hover:text-base-content border-base-300">
            Create Developer Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;