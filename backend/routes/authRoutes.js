const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");
const { JWT_SECRET } = require("../config");

const router = express.Router();

// Login Rate Limiting (Prevents Brute-force Attacks)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 login attempts per user
    message: { message: "Too many login attempts. Please try again after 15 minutes." },
});

// Email Transporter Setup (Nodemailer)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "softgpt9299@gmail.com", // Replace with your email
        pass: "epeh bslh dwke wfel", // Use an app password (Not your email password)
    },
});

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ message: "All fields are required" });

    if (!/\S+@\S+\.\S+/.test(email))
        return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 6)
        return res.status(400).json({ message: "Password must be at least 6 characters" });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already in use" });

        // Hash Password before saving
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error creating user" });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & return JWT token
 * @access  Public
 */
router.post("/login", loginLimiter, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password are required" });

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "User not found. Please check your email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Incorrect password. Please try again" });

        // Generate JWT Token (Expires in 15 minutes)
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Server error during login" });
    }
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Generate password reset token & send email
 * @access  Public
 */
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found." });

        // Generate reset token & set expiry time
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Generate Reset Link
        const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;

        // Send Reset Email
        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: user.email,
            subject: "Password Reset Request",
            text: `You requested a password reset. Click the link below to reset your password:\n\n${resetURL}\n\nIf you did not request this, please ignore this email.`,
        });

        res.json({ message: "Password reset link sent to your email." });
    } catch (err) {
        res.status(500).json({ message: "Error sending reset link" });
    }
});

/**
 * @route   POST /api/auth/reset-password
 * @desc    Verify reset token & update password
 * @access  Public
 */
router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }, // Ensure token is valid
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token." });

        // Hash new password
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.json({ message: "Password reset successful. You can now log in." });
    } catch (err) {
        res.status(500).json({ message: "Error resetting password" });
    }
});

module.exports = router;
