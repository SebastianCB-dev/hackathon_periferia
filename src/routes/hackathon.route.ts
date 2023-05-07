import { Request, Response, Router } from 'express';

const router = Router();

// * POST {{url}}/mutant
router.post('/mutant', (req: Request, res: Response) => {
  return res.status(200).json({
    ok: true,
    message: 'Mutant'
  });
});




export default router;