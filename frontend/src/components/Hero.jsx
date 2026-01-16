import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import star from "../assets/star.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${star})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' 
        }}
      >
       
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 container mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side: Text */}
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <div className="inline-block px-4 py-1 rounded-full border border-primary/50 bg-primary/20 text-white text-xs font-bold uppercase tracking-widest">
            🚀 Explore the World
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white">
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Digital Mesh.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
            Your gateway to the global developer community. DevMesh streamlines the way you highlight your technical skills, 
            find talented collaborators, and transform your static code into living, shared productions.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Link to="/login" className="btn btn-primary btn-lg px-10 shadow-xl">
              Join DevMesh
            </Link>
            <Link to="/signup" className="btn btn-outline btn-lg px-10 text-white hover:bg-white hover:text-black">
               Meet Developers
            </Link>
          </div>
        </div>

        {/* Right Side: Floating Logo */}
        <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center">
          <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
            
            <img 
              src={logo} 
              alt="DevMesh Logo" 
              className="relative w-64 h-64 md:w-96 md:h-96 object-contain animate-[float_6s_ease-in-out_infinite] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
      `}} />
    </div>
  );
};

export default Hero;