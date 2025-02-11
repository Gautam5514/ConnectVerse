import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!form.email) return "Email is required.";
        if (!/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email address.";
        if (!form.password) return "Password is required.";
        return null;
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const res = await login(form);
            localStorage.setItem("token", res.token);
            alert("Login successful! Redirecting to home...");
            navigate("/home");
        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Invalid email or password.";
            setError(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-6">
            <div className="bg-white shadow-2xl rounded-2xl px-10 py-8 max-w-md w-full border border-gray-300">
                <h2 className="text-3xl font-bold text-black text-center mb-6">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-black font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="text-black font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:ring-4 focus:ring-blue-300 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot & Reset Password Links */}
                <div className="flex justify-between mt-6 text-black text-sm">
                    <button
                        onClick={() => navigate("/forgot-password")}
                        className="underline hover:text-gray-600 transition duration-200 cursor-pointer"
                    >
                        Forgot Password?
                    </button>
                    <button
                        onClick={() => navigate("/reset-password")}
                        className="underline hover:text-gray-600 transition duration-200 cursor-pointer"
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
