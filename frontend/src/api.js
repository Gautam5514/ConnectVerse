// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

// export const signup = (data) => API.post("/signup", data);
// export const login = (data) => API.post("/login", data);

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api/auth" });

export const signup = async (data) => {
    try {
        const response = await API.post("/signup", data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Signup failed. Please try again.";
    }
};

export const login = async (data) => {
    try {
        const response = await API.post("/login", data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Invalid email or password.";
    }
};
