import express from 'express';
import { getCollaborations, createCollaboration } from '../controllers/collaborationController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getCollaborations);  // public
router.post('/', protect, createCollaboration);  // protected

export default router;
