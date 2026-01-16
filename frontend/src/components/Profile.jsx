import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_PHOTO_URL } from "../utils/constants";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-300">
        <div className="text-center p-10 bg-base-200/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-500">
          <p className="text-xl text-base-content/70 mb-6 font-medium">Please log in to explore the community</p>
          <Link to="/login" className="btn btn-primary btn-wide shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const { firstName, lastName, emailId, age, gender, about, photoUrl, skills = [] } = user;
  const displayPhotoUrl = photoUrl || DEFAULT_PHOTO_URL;
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "User";
  const displayGender = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : null;

  return (
    <div className="min-h-screen bg-base-300/30 py-10 px-4 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Essential Profile Card (Bento Style) */}
          <div className="lg:col-span-4 sticky top-10">
            <div className="group relative">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative card bg-base-200 shadow-2xl rounded-[2rem] overflow-hidden border border-white/5">
                {/* Your Shining Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                <div className="card-body items-center text-center pt-10 pb-8">
                  <div className="avatar mb-6">
                    <div className="w-40 h-40 rounded-full ring-offset-base-200 ring-offset-4 ring-4 ring-primary shadow-2xl overflow-hidden transform group-hover:scale-[1.03] transition-transform duration-500">
                      <img 
                            src={displayPhotoUrl} 
                            alt={fullName} 
                            className="object-cover h-full w-full" 
                            onError={(e) => {
                            e.target.src = DEFAULT_PHOTO_URL; 
                       }}
                      />
                    </div>
                  </div>

                  <h1 className="text-3xl font-black tracking-tight bg-gradient-to-br from-base-content to-base-content/60 bg-clip-text text-transparent">
                    {fullName}
                  </h1>
                  <p className="text-primary font-bold tracking-widest text-xs uppercase mt-1 mb-6">Developer Enthusiast</p>

                  <div className="w-full space-y-3 mb-8">
                    {emailId && (
                      <div className="flex items-center justify-center gap-3 py-3 px-4 bg-base-300/50 rounded-2xl border border-white/5 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span className="truncate opacity-80">{emailId}</span>
                      </div>
                    )}
                  </div>

                  <Link to="/profile/edit" className="btn btn-primary w-full rounded-2xl group/edit shadow-lg shadow-primary/20 border-none transition-all active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover/edit:rotate-12 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            
            {/* About Section */}
            <div className="card bg-base-200 shadow-xl rounded-[2rem] border border-white/5 overflow-hidden group">
              <div className="card-body p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Biography</h2>
                </div>
                <p className="text-lg text-base-content/70 leading-relaxed font-light whitespace-pre-wrap">
                  {about}
                </p>
              </div>
            </div>

           {/* Tech Stack Section */}
<div className="card bg-base-200 shadow-xl rounded-[2rem] border border-white/5 overflow-hidden group">
  <div className="card-body p-8">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-secondary/10 rounded-2xl text-secondary group-hover:rotate-12 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Technical Expertise</h2>
      </div>
      <span className="badge badge-secondary badge-outline px-4 py-3 font-bold text-xs uppercase tracking-tighter">
        {skills.length} Skills
      </span>
    </div>

    <div className="flex flex-wrap gap-4">
      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <div 
            key={index} 
            className="group/skill relative px-6 py-3 bg-base-300 rounded-2xl border border-white/5 text-sm font-black text-secondary hover:text-white transition-all cursor-default shadow-lg hover:shadow-secondary/20 active:scale-95 overflow-hidden"
          >
            {/* Hover Background Fill Effect */}
            <div className="absolute inset-0 bg-secondary translate-y-full group-hover/skill:translate-y-0 transition-transform duration-300 ease-out -z-0"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover/skill:bg-white transition-colors"></span>
              {skill}
            </span>
          </div>
        ))
      ) : (
        <div className="w-full py-10 border-2 border-dashed border-base-content/10 rounded-[2rem] text-center">
          <p className="text-base-content/40 italic">Your tech stack is currently empty.</p>
          <Link to="/profile/edit" className="text-secondary font-bold hover:underline mt-2 inline-block">Add skills now</Link>
        </div>
      )}
    </div>
    
    {/* Subtle Progress Bar Decoration */}
    {skills.length > 0 && (
      <div className="mt-8 pt-6 border-t border-white/5">
         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-2">
            <span>Stack Completion</span>
            <span>{Math.min(skills.length * 10, 100)}%</span>
         </div>
         <div className="w-full h-1.5 bg-base-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-1000" 
              style={{ width: `${Math.min(skills.length * 10, 100)}%` }}
            ></div>
         </div>
      </div>
    )}
  </div>
</div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Age", value: age ? `${age} Years` : "Not Provided", color: "primary", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
                { label: "Gender", value: displayGender || "Not Provided", color: "secondary", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" }
              ].map((item, idx) => (
                <div key={idx} className="bg-base-200 p-8 rounded-[2rem] border border-white/5 shadow-xl flex items-center gap-6 group hover:bg-base-300/50 transition-colors cursor-default">
                  <div className={`p-4 bg-${item.color}/10 rounded-2xl text-${item.color} group-hover:scale-110 transition-transform`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-base-content/40 mb-1">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;