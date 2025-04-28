import DevLog from '../models/DevLog.js';

// @desc Get all dev logs
export const getDevLogs = async (req, res) => {
  const logs = await DevLog.find().populate('author', 'username').sort({ createdAt: -1 });
  res.status(200).json(logs);
};

// @desc Create a dev log
export const createDevLog = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
  const log = await DevLog.create({ title, content, author: req.user.id });
  res.status(201).json(log);
};
