const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['industry', 'competitive', 'milestone']
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  // Store file as Buffer (for images and PDFs under 16MB)
  fileData: {
    type: Buffer,
    required: false
  },
  fileContentType: {
    type: String,  // e.g., 'image/jpeg', 'application/pdf'
    required: false
  },
  fileType: {
    type: String,  // 'image' or 'pdf'
    required: false
  },
  filename: {
    type: String,
    required: false
  },
  // Keep URL field for backward compatibility
  fileUrl: {
    type: String,
    default: ''
  },
  issuer: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Achievement", achievementSchema);