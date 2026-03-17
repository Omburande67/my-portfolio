const Blog = require("../models/Blog");

// GET all blogs (sorted by date, newest first)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1, createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single blog by slug (for frontend)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE blog
exports.createBlog = async (req, res) => {
  try {
    const blogData = { ...req.body };
    
    // Parse tags if they come as comma-separated string
    if (blogData.tags && typeof blogData.tags === 'string') {
      blogData.tags = blogData.tags.split(',').map(tag => tag.trim());
    }

    const blog = new Blog(blogData);
    await blog.save();
    
    res.status(201).json({
      success: true,
      blog,
      message: "Blog created successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE blog
exports.updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Parse tags if they come as comma-separated string
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.json({
      success: true,
      blog,
      message: "Blog updated successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET blogs by tag
exports.getBlogsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const blogs = await Blog.find({ tags: tag }).sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};