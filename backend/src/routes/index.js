import { Router } from 'express';
import admin from './admin.js';
import catalog from './catalog.js';
import content from './content.js';
import exam from './exam.js';
import progress from './progress.js';
import auth from './auth.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/rbac.js';

const router = Router();
router.use('/auth', auth);
router.use('/catalog', authMiddleware, catalog);
router.use('/contents', authMiddleware, content);
router.use('/exams', authMiddleware, exam);
router.use('/progress', authMiddleware, progress);
router.use('/admin', authMiddleware, requireAdmin, admin);

export { router };