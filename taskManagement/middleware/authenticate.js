const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
    try {
       
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Authorization header missing' });
        }

        
        const token = authHeader.replace('Bearer ', '');


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

       
        req.user = user;
        next(); 

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
