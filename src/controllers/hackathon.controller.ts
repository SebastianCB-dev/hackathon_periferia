import { Request, Response } from 'express';


export const isMutant = (req: Request, res: Response) => {
  return res.status(200).json({
    ok: true,
    message: 'Mutant'
  });
}