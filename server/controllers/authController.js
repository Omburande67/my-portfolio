const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        console.log("Login attempt with:", username);

        // IMPORTANT: Search by email field since your schema uses email
        const admin = await Admin.findOne({ email: username });
        
        if (!admin) {
            console.log("Admin not found with email:", username);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            console.log("Password mismatch for:", username);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log("Login successful for:", username);
        res.json({ 
            token,
            admin: {
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};