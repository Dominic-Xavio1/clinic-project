import User from '../models/user.js';

import express from 'express';
const testRoute = express.Router();
testRoute.get('/', async (req, res) => {
    try {
        const users = await User.find({role:"doctor"}).select("name email");
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
export default testRoute;



