const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Cannot create a user with this email."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber
        });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating the new user",
            error: error.message 
        });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while logging in",
            error: error.message
        });
    }
};