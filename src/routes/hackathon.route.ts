import { Router } from 'express';
import { checkMutant, getStats } from '../controllers/hackathon.controller';

const router = Router();

// * POST {{url}}/mutant
router.post('/mutant', checkMutant);

// * GET {{url}}/stats
router.get('/stats', getStats);

export default router;