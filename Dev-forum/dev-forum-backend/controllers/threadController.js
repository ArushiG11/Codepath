import Thread from '../models/Thread.js';

// @desc Get all threads
export const getThreads = async (req, res) => {
  try {
    const threads = await Thread.find().populate('author', 'username').sort({ createdAt: -1 });
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch threads' });
  }
};

// @desc Create a new thread
export const createThread = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const thread = await Thread.create({
      title,
      content,
      author: req.user.id, // From protect middleware
    });
    res.status(201).json(thread);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create thread' });
  }
};

// @desc Get a single thread by ID
export const getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id).populate('author', 'username');
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    res.status(200).json(thread);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch thread' });
  }
};
