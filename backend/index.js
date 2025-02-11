const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const { MONGO_URI, PORT } = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

// Apply rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 requests per windowMs
    message: { message: "Too many requests, please try again later." },
    headers: true, // Send rate limit info in response headers
});

//  Apply rate limiting ONLY to authentication routes
app.use("/api/auth", apiLimiter, authRoutes);

//  Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
