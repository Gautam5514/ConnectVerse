import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/forgot-password", { email });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error sending reset link.");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            {message && <p className="text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Send Reset Link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
