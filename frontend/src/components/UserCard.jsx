import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    if (!user) return null;

    // Destructuring skills and providing a fallback if empty
    const { _id, firstName, lastName, photoUrl, about, skills = [] } = user;

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(
                `${BASE_URL}/request/send/${status}/${userId}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeUser(userId));
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="group relative w-88 bg-gradient-to-br from-base-300 to-base-100 shadow-2xl rounded-3xl p-8 overflow-hidden 
         min-h-[450px] border border-white/5 transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2">
            
            {/* --- GLOW EFFECT ON HOVER --- */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>

            {/* --- PROFILE IMAGE --- */}
            <div className="relative flex justify-center mb-6">
                <div className="relative group/avatar">
                    <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-20 group-hover/avatar:opacity-40 transition-opacity"></div>
                    <img
                        src={photoUrl || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="relative w-32 h-32 rounded-full object-cover border-4 border-base-300 shadow-xl"
                    />
                    <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-4 border-base-300 rounded-full shadow-sm"></div>
                </div>
            </div>

            {/* --- USER INFO --- */}
            <div className="text-center space-y-3">
                <div className="flex justify-center items-center gap-1.5">
                    <h2 className="font-bold text-xl text-white tracking-tight capitalize">
                        {firstName} {lastName}
                    </h2>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-400 drop-shadow-sm">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397a4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549a4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* --- FULL TECH STACK --- */}
                <div className="flex flex-wrap justify-center gap-2 min-h-[50px]">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider bg-primary/10 border border-primary/20 rounded-lg text-primary shadow-sm hover:bg-primary hover:text-white transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span className="text-[10px] opacity-40 italic tracking-widest">Engineer</span>
                    )}
                </div>

                <p className="text-xs text-base-content/60 leading-relaxed italic px-2 line-clamp-2">
                    "{about || "Developer Enthusiast"}"
                </p>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="mt-8 flex items-center justify-between gap-4">
                <button 
                    className="flex-1 h-12 rounded-xl font-bold text-sm border border-white/10 bg-white/5 hover:bg-error/10 hover:text-error hover:border-error/20 transition-all flex items-center justify-center gap-2"
                    onClick={() => handleSendRequest("ignored", _id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Pass
                </button>

                <button 
                    className="flex-[2] h-12 rounded-xl font-bold text-sm bg-primary text-primary-content 
                    hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 transition-all flex items-center 
                    justify-center gap-2 border-2 border-white/10"
                    onClick={() => handleSendRequest("interested", _id)}
                >
                    Interested
                </button>
            </div>
            
        </div>
    );
};

export default UserCard;