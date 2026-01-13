import React from 'react'
import logo from "./assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-[#0f172a] text-neutral-content p-10 border-t
     border-white/5 shadow-inner shadow-black/20">
      <aside className="flex flex-col gap-2">
        {/* Branding Section */}
        <div className="flex items-center gap-3">
          <img 
            src={logo}  
            alt="DevMesh Logo"
            className="w-24 h-24 object-contain transition-all duration-500 hover:rotate-6 hover:scale-110 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]"
          />
          <span className="text-2xl font-black tracking-tighter text-white">
            Dev<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-orange-400">Mesh</span>
          </span>
        </div>
        
        <p className="max-w-xs text-gray-400 mt-2">
          <strong className="text-white">DevMesh Platform Ltd.</strong>
          <br />
          The premier networking platform for top-tier developers.
          <br />
          Built for the future of tech collaboration.
        </p>
      </aside>

      {/* Nav Sections for a more "Professional" feel */}
      <nav>
        <h6 className="footer-title text-orange-400 opacity-100">Platform</h6>
        <a className="link link-hover hover:text-purple-400">Discover Devs</a>
        <a className="link link-hover hover:text-purple-400">Success Stories</a>
        <a className="link link-hover hover:text-purple-400">Tech Stack Match</a>
      </nav>

      <nav>
        <h6 className="footer-title text-blue-400 opacity-100">Social</h6>
        <div className="grid grid-flow-col gap-4">
          {/* Twitter/X */}
          <a className="hover:text-blue-400 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          {/* YouTube */}
          <a className="hover:text-red-500 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          {/* LinkedIn (Better for Tech pros than Facebook) */}
          <a className="hover:text-blue-600 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;