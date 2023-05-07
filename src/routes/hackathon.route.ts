import { Router } from 'express';
import { checkMutant } from '../controllers/hackathon.controller';

const router = Router();

// * POST {{url}}/mutant
router.post('/mutant', checkMutant);

export default router;