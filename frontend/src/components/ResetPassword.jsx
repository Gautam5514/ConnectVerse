import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/reset-password", { token, newPassword });
            setMessage(res.data.message);
            setTimeout(() => navigate("/login"), 3000); // Redirect after success
        } catch (err) {
            setMessage(err.response?.data?.message || "Error resetting password.");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            {message && <p className="text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
