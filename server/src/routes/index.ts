import { Router } from 'express';
import healthRouter from './health.route.js';

const router = Router();

router.use('/v1', healthRouter);

export default router;
