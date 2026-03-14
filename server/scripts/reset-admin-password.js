// server/scripts/reset-admin-password.js
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Find your admin
        const admin = await Admin.findOne({ email: 'omburande764@gmail.com' });
        
        if (!admin) {
            console.log('❌ Admin not found');
            process.exit(1);
        }

        // Set new password (change this to whatever you want)
        const newPassword = 'admin123'; // You can change this
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        admin.password = hashedPassword;
        await admin.save();

        console.log('✅ Password reset successfully!');
        console.log('Email:', admin.email);
        console.log('New password:', newPassword);
        console.log('You can now login with this password');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        mongoose.disconnect();
        process.exit();
    }
};

resetPassword();