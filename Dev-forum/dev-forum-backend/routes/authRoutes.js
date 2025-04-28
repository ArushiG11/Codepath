// import express from 'express';
// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const user = new User({ username, email, password });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
//     res.status(201).json({ token, username: user.username });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
//     res.json({ token, username: user.username });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


import express from 'express';
import { registerUser, loginUser, getMe, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); 
router.put('/profile', protect, updateProfile);

export default router;

