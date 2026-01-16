import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        gender: "male",
        age: "",
        about: "",
        photoUrl: "", 
    });
    
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    useEffect(() => {
        if(user) navigate("/feed");
    }, [user, navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await axios.post(BASE_URL + "/signup", formData, {
                withCredentials: true,
            });
            dispatch(addUser(res.data.data)); 
            navigate("/feed");
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if(error) setError("");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral relative overflow-hidden py-12 px-4">
            {/* Background Animations */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>

            {/* Magnificent Border Container: Uses a gradient background with padding to simulate a thin border */}
            <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-primary via-blue-500 to-orange-500 shadow-2xl w-full max-w-2xl group transition-all duration-500 hover:shadow-primary/20">
                
                <div className="card w-full bg-base-100 backdrop-blur-xl rounded-[22px] z-10 overflow-hidden">
                    <div className="card-body p-8">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative group">
                                <img src={logo} alt="Logo" className="w-16 h-16 object-contain mb-2 transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <h2 className="text-3xl font-black tracking-tighter">JOIN <span className="text-primary">DEVMESH</span></h2>
                            <p className="text-xs opacity-60 font-bold uppercase tracking-widest">Create your developer profile</p>
                        </div>

                        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* First Name */}
                            <div className="form-control">
                                <label className="label font-bold text-xs uppercase opacity-70">First Name</label>
                                <input name="firstName" type="text" placeholder="Derry" className="input input-bordered focus:border-primary transition-all bg-base-200/50" required onChange={handleChange} />
                            </div>

                            {/* Last Name */}
                            <div className="form-control">
                                <label className="label font-bold text-xs uppercase opacity-70">Last Name</label>
                                <input name="lastName" type="text" placeholder="Smith" className="input input-bordered focus:border-primary transition-all bg-base-200/50" onChange={handleChange} />
                            </div>

                            {/* Email */}
                            <div className="form-control md:col-span-2">
                                <label className="label font-bold text-xs uppercase opacity-70">Email ID</label>
                                <input name="emailId" type="email" placeholder="derry@gmail.com" className="input input-bordered focus:border-primary transition-all bg-base-200/50" required onChange={handleChange} />
                            </div>

                            {/* Photo URL */}
                            <div className="form-control md:col-span-2">
                                <label className="label font-bold text-xs uppercase opacity-70">Profile Picture URL</label>
                                <input name="photoUrl" type="url" placeholder="https://example.com/photo.jpg" className="input input-bordered focus:border-primary transition-all bg-base-200/50" onChange={handleChange} />
                            </div>

                            {/* Password */}
                            <div className="form-control md:col-span-2">
                                <label className="label font-bold text-xs uppercase opacity-70">Password</label>
                                <div className="relative">
                                    <input 
                                        name="password"
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        className="input input-bordered w-full focus:border-primary transition-all bg-base-200/50" 
                                        required 
                                        onChange={handleChange} 
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold hover:text-primary transition-colors">
                                        {showPassword ? "HIDE" : "SHOW"}
                                    </button>
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="form-control">
                                <label className="label font-bold text-xs uppercase opacity-70">Gender</label>
                                <select name="gender" className="select select-bordered focus:border-primary transition-all bg-base-200/50" onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>

                            {/* Age */}
                            <div className="form-control">
                                <label className="label font-bold text-xs uppercase opacity-70">Age</label>
                                <input name="age" type="number" placeholder="25" className="input input-bordered focus:border-primary transition-all bg-base-200/50" onChange={handleChange} />
                            </div>

                            {/* About */}
                            <div className="form-control md:col-span-2">
                                <label className="label font-bold text-xs uppercase opacity-70">About</label>
                                <textarea name="about" placeholder="Tell us about your tech stack..." className="textarea textarea-bordered focus:border-primary transition-all bg-base-200/50 h-24" onChange={handleChange}></textarea>
                            </div>

                            {error && (
                                <div className="md:col-span-2 p-3 bg-error/10 border-l-4 border-error text-error text-sm font-mono animate-shake">
                                    {error}
                                </div>
                            )}

                            <div className="md:col-span-2 mt-4">
                                <button type="submit" disabled={isLoading} className="btn btn-primary w-full shadow-lg text-white hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    {isLoading ? <span className="loading loading-spinner"></span> : "Register as Developer"}
                                </button>
                            </div>
                        </form>

                        <div className="divider text-xs opacity-50 uppercase mt-6">Already have an account?</div>
                        <Link to="/login" className="btn btn-outline btn-block border-base-300 hover:bg-base-200 hover:text-base-content transition-all">Login Instead</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;