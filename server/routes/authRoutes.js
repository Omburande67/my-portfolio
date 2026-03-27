const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/authController");

// Auth route
router.post("/login", loginAdmin);

// Optional test route (helps debugging deployment)
router.get("/test", (req, res) => {
    res.json({ message: "Auth route working ✅" });
});

module.exports = router;