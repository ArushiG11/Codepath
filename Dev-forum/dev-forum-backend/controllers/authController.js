import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc Register new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

// @desc Get current logged-in user
export const getMe = async (req, res) => {
  const { _id, username, email } = req.user;
  res.status(200).json({ id: _id, username, email });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc Update user profile
export const updateProfile = async (req, res) => {
    const { username, bio, skills, profilePic } = req.body;
  
    const user = await User.findById(req.user.id);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (profilePic) user.profilePic = profilePic;
  
    const updatedUser = await user.save();
  
    res.status(200).json(updatedUser);
  };
  
