import { Router } from 'express';
import { isMutant } from '../controllers/hackathon.controller';

const router = Router();

// * POST {{url}}/mutant
router.post('/mutant', isMutant);

export default router;