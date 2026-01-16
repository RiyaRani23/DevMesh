import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(BASE_URL + "/forgotPassword", {
                email, // Matches your backend { email, newPassword }
                newPassword 
            });
            setMessage(res.data.message);
            setTimeout(() => navigate("/login"), 2000); // Redirect after success
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-300 px-4">
            <div className="card w-96 bg-base-100 shadow-2xl p-8 rounded-3xl border border-white/5">
                <h2 className="text-2xl font-black mb-6 text-center uppercase tracking-tighter">Reset <span className="text-primary">Password</span></h2>
                
                <form onSubmit={handleReset} className="space-y-4">
                    <div className="form-control">
                        <label className="label text-xs font-bold uppercase opacity-60">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered focus:border-primary" required />
                    </div>
                    <div className="form-control">
                        <label className="label text-xs font-bold uppercase opacity-60">New Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input input-bordered focus:border-primary" required />
                    </div>
                    {message && <p className="text-success text-xs font-bold">{message}</p>}
                    {error && <p className="text-error text-xs font-bold">{error}</p>}
                    
                    <button type="submit" className="btn btn-primary w-full mt-4">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;