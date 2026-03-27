const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const blogController = require("../controllers/blogController");

// ✅ Base route (IMPORTANT FIX)
router.get("/", blogController.getAllBlogs);

// Public routes
router.get("/all", blogController.getAllBlogs);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.get("/tag/:tag", blogController.getBlogsByTag);
router.get("/id/:id", blogController.getBlogById);

// Admin routes (protected)
router.post("/", authMiddleware, blogController.createBlog);
router.put("/:id", authMiddleware, blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;