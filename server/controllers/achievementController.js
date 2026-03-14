const Achievement = require("../models/Achievement");

// GET all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 });
    
    // Don't send fileData in list view (too large)
    const safeAchievements = achievements.map(a => {
      const obj = a.toObject();
      delete obj.fileData; // Remove binary data from list
      return obj;
    });
    
    res.json(safeAchievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET achievements by category
exports.getAchievementsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const achievements = await Achievement.find({ category }).sort({ order: 1, createdAt: -1 });
    
    // Don't send fileData in list view
    const safeAchievements = achievements.map(a => {
      const obj = a.toObject();
      delete obj.fileData;
      return obj;
    });
    
    res.json(safeAchievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single achievement (includes file data)
exports.getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET file for display
exports.getFile = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement || !achievement.fileData) {
      return res.status(404).json({ message: "File not found" });
    }
    
    // Set proper content type
    res.set('Content-Type', achievement.fileContentType);
    res.send(achievement.fileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE achievement
exports.createAchievement = async (req, res) => {
  try {
    const achievementData = { ...req.body };
    
    // Handle file upload
    if (req.file) {
      achievementData.fileData = req.file.buffer;
      achievementData.fileContentType = req.file.mimetype;
      achievementData.filename = req.file.originalname;
      achievementData.fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'pdf';
      achievementData.fileUrl = `/api/achievements/file/${Date.now()}`; // Will be updated after save
    }

    const achievement = new Achievement(achievementData);
    await achievement.save();
    
    // Update fileUrl with actual ID
    if (req.file) {
      achievement.fileUrl = `/api/achievements/file/${achievement._id}`;
      await achievement.save();
    }
    
    // Don't send fileData back
    const response = achievement.toObject();
    delete response.fileData;
    
    res.status(201).json({
      success: true,
      achievement: response,
      message: "Achievement created successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE achievement
exports.updateAchievement = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Handle new file upload
    if (req.file) {
      updateData.fileData = req.file.buffer;
      updateData.fileContentType = req.file.mimetype;
      updateData.filename = req.file.originalname;
      updateData.fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'pdf';
      updateData.fileUrl = `/api/achievements/file/${req.params.id}`;
    }

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    
    // Don't send fileData back
    const response = achievement.toObject();
    delete response.fileData;
    
    res.json({
      success: true,
      achievement: response,
      message: "Achievement updated successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    
    res.json({
      success: true,
      message: "Achievement deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};