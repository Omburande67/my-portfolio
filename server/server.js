require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const path = require('path');
const app = express();



// Middleware
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/achievements", achievementRoutes);

// Debug route to check database
app.get("/api/debug/check", async (req, res) => {
    try {
        const Admin = require("./models/Admin");
        const admins = await Admin.find({});
        res.json({
            connected: mongoose.connection.readyState === 1,
            database: mongoose.connection.name,
            admins: admins.map(a => ({ email: a.email, id: a._id }))
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected to:", mongoose.connection.name);
        app.listen(process.env.PORT || 5000, () => {
            console.log("🚀 Server running on port 5000");
        });
    })
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });