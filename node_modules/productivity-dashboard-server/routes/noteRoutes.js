import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  getNotes,
  createNote,
  deleteNote,
} from '../controllers/noteController.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);

export default router;
