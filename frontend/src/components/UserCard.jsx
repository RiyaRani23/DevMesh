import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    if (!user) return null;
    const { _id, firstName, lastName, photoUrl, about } = user;

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
        <div className="group relative w-80 bg-base-300 shadow-xl rounded-xl p-4 overflow-hidden transition-all hover:scale-[1.02]">
            
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>

            <button 
                className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 z-10"
                onClick={() => handleSendRequest("ignored", _id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="flex justify-center mt-2">
                <div className="relative">
                    <img
                        src={photoUrl || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-base-300"
                    />
                </div>
            </div>

            <div className="text-center mt-4">
                <div className="flex justify-center items-center gap-1">
                    <h2 className="font-semibold text-lg capitalize">{firstName} {lastName}</h2>
                    {/* Verified Badge (Using SVG instead of MdVerified) */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                </div>

                <p className="text-sm text-base-content/70 mt-1 line-clamp-2 h-10 px-2">
                    {about}
                </p>
            </div>

            <div className="mt-4">
                <button 
                    className="btn btn-primary w-full gap-2 group/btn"
                    onClick={() => handleSendRequest("interested", _id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover/btn:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v9m-4.5-4.5h9M3 20.25v-1.5a4.5 4.5 0 014.5-4.5h4.5a4.5 4.5 0 014.5 4.5v1.5m-1.5-12.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Interested
                </button>
            </div>
        </div>
    );
};

export default UserCard;