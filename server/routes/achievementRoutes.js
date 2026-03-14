const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
// Change this line to match your actual filename
const authMiddleware = require("../middleware/authMiddleware"); // or authMiddleware.js
const achievementController = require("../controllers/achievementController");

// Public routes
router.get("/all", achievementController.getAllAchievements);
router.get("/category/:category", achievementController.getAchievementsByCategory);
router.get("/:id", achievementController.getAchievement);
router.get("/file/:id", achievementController.getFile); // Serve file by ID

// Admin routes (protected)
router.post("/", authMiddleware, upload.single('file'), achievementController.createAchievement);
router.put("/:id", authMiddleware, upload.single('file'), achievementController.updateAchievement);
router.delete("/:id", authMiddleware, achievementController.deleteAchievement);

module.exports = router;