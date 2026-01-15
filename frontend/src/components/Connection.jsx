import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection?.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnection(res?.data?.data));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    // Safety check for Redux state
    if (!connections) return (
        <div className="flex justify-center my-20">
            <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200/50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                
                {/* Visual Stats Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2 gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-base-content">
                            Network
                        </h1>
                        <p className="text-base-content/60 font-medium">
                            You have <span className="text-primary">{connections.length}</span> professional connections
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-base-100 px-4 py-2 rounded-2xl shadow-sm border border-base-300 text-sm font-bold">
                            Active: {connections.filter(c => c.photoUrl).length}
                        </div>
                    </div>
                </div>

                {/* Main Container */}
                <div className="bg-base-100 rounded-[2rem] shadow-2xl shadow-primary/5 border border-base-300 overflow-hidden">
                    <ul className="divide-y divide-base-200">
                        {connections.length === 0 ? (
                            <div className="flex flex-col items-center py-24 text-center">
                                <div className="bg-base-200 size-20 rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce">
                                    🗺️
                                </div>
                                <h3 className="text-xl font-bold">Your circle is empty</h3>
                                <p className="opacity-50 max-w-xs mx-auto">Start exploring the feed to connect with developers worldwide.</p>
                            </div>
                        ) : (
                            connections.map((connection, index) => (
                                <li 
                                    key={connection.id || connection._id} 
                                    className="group flex items-center p-5 hover:bg-primary/5 transition-all duration-300 ease-out gap-5"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Profile Photo with Glow */}
                                    <div className="relative shrink-0">
                                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                        <img 
                                            className="relative size-16 rounded-2xl object-cover ring-2 ring-base-300 group-hover:ring-primary/30 transition-all" 
                                            src={connection.photoUrl || "https://via.placeholder.com/150"} 
                                            alt="profile"
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                                        />
                                        <div className="absolute -bottom-1 -right-1 size-4 bg-success rounded-full border-4 border-base-100"></div>
                                    </div>
                                    
                                    {/* Connection Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-lg text-base-content truncate group-hover:text-primary transition-colors">
                                                {connection.firstName} {connection.lastName}
                                            </span>
                                            {index === 0 && <span className="badge badge-secondary badge-xs py-2 font-bold uppercase tracking-tighter">New</span>}
                                        </div>
                                        <p className="text-sm opacity-60 line-clamp-1 font-medium italic mb-1">
                                            {connection.about || "Tech Enthusiast & Software Architect"}
                                        </p>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Connect 2m ago</span>
                                        </div>
                                    </div>

                                    {/* Action Cluster */}
                                    <div className="flex items-center gap-3">
                                        <button className="btn btn-primary btn-md rounded-2xl px-6 font-black shadow-lg shadow-primary/20 hover:shadow-primary/40 border-none transition-all active:scale-95 hidden sm:flex">
                                            Message
                                        </button>
                                        
                                        <div className="dropdown dropdown-end">
                                            <div 
                                                tabIndex={0} 
                                                role="button" 
                                                className="btn btn-circle btn-ghost btn-sm text-xl hover:bg-base-300 transition-colors"
                                            >
                                                &#8942;
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-2xl z-[1] w-56 p-2 shadow-2xl border border-base-300 mt-2">
                                                <li>
                                                    <a className="py-3 font-bold">View Full Profile</a>
                                                </li>
                                                <li>
                                                    <a className="py-3 font-bold text-error hover:bg-error/10 flex justify-between">
                                                        Remove Connection
                                                        <span className="text-xl leading-none">&times;</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Footer Info */}
                <p className="text-center mt-8 text-xs font-bold opacity-30 uppercase tracking-[0.2em]">
                    End of connections
                </p>
            </div>
        </div>
    );
};

export default Connections;