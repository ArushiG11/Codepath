import Collaboration from '../models/Collaboration.js';

// @desc Get all collaboration posts
export const getCollaborations = async (req, res) => {
  const posts = await Collaboration.find().populate('author', 'username').sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// @desc Create a new collaboration post
export const createCollaboration = async (req, res) => {
  const { projectTitle, description, contactInfo } = req.body;
  if (!projectTitle || !description || !contactInfo) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }
  const post = await Collaboration.create({
    projectTitle,
    description,
    contactInfo,
    author: req.user.id,
  });
  res.status(201).json(post);
};
