import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    useEffect(() => {
        if(user) navigate("/feed");
    }, [user, navigate]);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setError("");
        if (!emailId || !password) return setError("All fields are required");
        setIsLoading(true);
        try {
            const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
            dispatch(addUser(res.data));
            navigate("/feed");
        } catch(err){
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#0f172a] relative overflow-hidden">
            {/* Dynamic Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="card w-full max-w-md bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 z-10 m-4 transition-all hover:border-white/20">
                <div className="card-body p-10">
                    <div className="flex flex-col items-center mb-10">
                        <div className="avatar mb-4 animate-bounce-slow">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
                                <img src={logo} alt="Logo" className="rounded-2xl bg-white p-2" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tighter">
                            DEV<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">MESH</span>
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold">The Developer Network</p>
                    </div>

                    <div className="space-y-4">
                        <div className="form-control">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="input bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/20 focus:border-blue-500 transition-all" 
                            />
                        </div>

                        <div className="form-control relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/20 focus:border-blue-500 transition-all" 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-xs font-bold text-gray-400 hover:text-white"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-xs mt-4 font-mono">{error}</p>}

                    <div className="mt-8">
                        <button 
                            onClick={handleLogin} 
                            disabled={isLoading}
                            className="btn btn-primary w-full bg-gradient-to-r from-blue-600 to-indigo-600 border-none hover:scale-[1.02] active:scale-95 transition-all text-white font-bold"
                        >
                            {isLoading ? "AUTHENTICATING..." : "LOGIN TO ACCOUNT"}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">Don't have an account?</p>
                        <Link to="/signup" className="text-blue-400 font-bold hover:underline mt-1 block">Create Developer ID</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;