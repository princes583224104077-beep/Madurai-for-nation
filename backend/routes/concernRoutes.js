import express from 'express';
import { body } from 'express-validator';
import upload from '../middleware/uploadMiddleware.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  createConcern,
  publicCreateConcern,
  getTrackingDetails,
  getMyConcerns,
  updateConcernStatus,
  assignConcern,
  addTimelineUpdate,
  deleteConcern,
} from '../controllers/concernController.js';

const router = express.Router();

const concernValidation = [
  body('title').trim().notEmpty().withMessage('Concern title is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('assemblyConstituency').trim().notEmpty().withMessage('Assembly constituency is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('citizenName').trim().notEmpty().withMessage('Citizen name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phone').optional({ checkFalsy: true }).isMobilePhone('en-IN').withMessage('Enter a valid phone number'),
];

router.post('/', protect, upload.single('attachment'), concernValidation, createConcern);
router.post('/public', upload.single('attachment'), concernValidation, publicCreateConcern);
router.get('/track/:trackingId', getTrackingDetails);
router.get('/my-concerns', protect, getMyConcerns);
router.put('/:trackingId/status', protect, adminOnly, updateConcernStatus);
router.put('/:trackingId/assign', protect, adminOnly, assignConcern);
router.put('/:trackingId/timeline', protect, adminOnly, addTimelineUpdate);
router.delete('/:trackingId', protect, adminOnly, deleteConcern);

export default router;
