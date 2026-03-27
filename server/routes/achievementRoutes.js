const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const authMiddleware = require("../middleware/authMiddleware");
const achievementController = require("../controllers/achievementController");

// ✅ Base route (IMPORTANT FIX)
router.get("/", achievementController.getAllAchievements);

// Public routes
router.get("/all", achievementController.getAllAchievements);
router.get("/category/:category", achievementController.getAchievementsByCategory);
router.get("/file/:id", achievementController.getFile); // keep ABOVE :id
router.get("/:id", achievementController.getAchievement);

// Admin routes (protected)
router.post("/", authMiddleware, upload.single("file"), achievementController.createAchievement);
router.put("/:id", authMiddleware, upload.single("file"), achievementController.updateAchievement);
router.delete("/:id", authMiddleware, achievementController.deleteAchievement);

module.exports = router;