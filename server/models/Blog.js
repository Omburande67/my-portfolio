const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 300
  },
  coverImage: {
    type: String, // Cloudinary URL
    required: true
  },
  date: {
    type: String,
    required: true,
    default: () => {
      const d = new Date();
      return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
    }
  },
  readTime: {
    type: String,
    required: true,
    default: "5 min"
  },
  tags: [{
    type: String
  }],
  content: {
    type: String, // Full blog content for detail page
    required: false
  },
  slug: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate slug from title before saving
blogSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);