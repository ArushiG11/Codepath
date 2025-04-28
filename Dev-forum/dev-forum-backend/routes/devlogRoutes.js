import express from 'express';
import { getDevLogs, createDevLog } from '../controllers/devlogController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getDevLogs);  // public
router.post('/', protect, createDevLog);  // protected

export default router;
