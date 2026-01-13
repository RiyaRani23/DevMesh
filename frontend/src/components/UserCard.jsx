import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const dispatch = useDispatch();
    if (!user) return null;
    const { _id, firstName, lastName, photoUrl, about } = user;

    const handleSendRequest = async (status, userId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, 
                {withCredentials: true}
            );
            dispatch(removeUser(userId));
        }catch (err){
            console.error(err.message);
        }
    }

    return (
        <div className="w-80 bg-base-300 shadow-xl rounded-xl p-4 relative">
        
        {/* Close Button */}
        <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={() => handleSendRequest("ignored", _id)}>
            <HiXMark className="text-lg" />
        </button>

        {/* Profile Image */}
        <div className="flex justify-center mt-2">
            <div className="relative">
            <img
                src={photoUrl}
                alt="Profile"
                className="w-35 h-35 rounded-full object-cover"
            />
            </div>
        </div>

        {/* Name */}
        <div className="text-center mt-4">
            <div className="flex justify-center items-center gap-1">
            <h2 className="font-semibold text-lg">{firstName} {lastName}</h2>
            <MdVerified className="text-primary" />
            </div>

            <p className="text-sm text-base-content/70">
            {about}
            </p>
        </div>

        {/* Connect Button */}
        <div className="mt-4">
            <button className="btn btn-outline btn-primary w-full gap-2"
                onClick={() => handleSendRequest("interested", _id)}>
            <FiUserPlus />
            Interested
            </button>
        </div>
        </div>
    );
}

export default UserCard;