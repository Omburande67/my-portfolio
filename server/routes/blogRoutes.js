const express = require("express");
const router = express.Router();
// Fix the import path to match your actual filename
const authMiddleware = require("../middleware/authmiddleware"); // Changed from "auth" to "authmiddleware"
const blogController = require("../controllers/blogController");

// Public routes (no auth needed)
router.get("/all", blogController.getAllBlogs);
router.get("/id/:id", blogController.getBlogById);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.get("/tag/:tag", blogController.getBlogsByTag);

// Admin routes (protected)
router.post("/", authMiddleware, blogController.createBlog);
router.put("/:id", authMiddleware, blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;