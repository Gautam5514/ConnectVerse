import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";

const Signup = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const validateForm = () => {
        if (!form.username) return "Username is required.";
        if (!form.email) return "Email is required.";
        if (!/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email address.";
        if (!form.password) return "Password is required.";
        if (form.password.length < 6) return "Password must be at least 6 characters.";
        return null;
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await signup(form);
            alert("Signup successful! Redirecting to login...");
            navigate("/login"); // Redirect to login
        } catch (err) {
            setError(err || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 max-w-md w-full bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Create an Account</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Username</label>
                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={handleChange}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={handleChange}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-6">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
