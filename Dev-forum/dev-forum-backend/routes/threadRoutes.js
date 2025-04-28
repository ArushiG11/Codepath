import express from 'express';
import { getThreads, createThread, getThreadById } from '../controllers/threadController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getThreads);        // List all threads
router.post('/', protect, createThread);  // Create new thread (protected)
router.get('/:id', getThreadById);   // View one thread

export default router;
