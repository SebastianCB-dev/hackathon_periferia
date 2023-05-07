import { Request, Response } from 'express';

import { isMutant } from '../helpers/mutant.helper';

// Controller that handles the request to check if the DNA is mutant.
// If the DNA is mutant, it returns a status 200 and a message of true.
// If it is not mutant, it returns a status 403 and a message of false.
export const checkMutant = (req: Request, res: Response) => {
  const { dna } = req.body;

  if (!dna) {
    return res.status(400).json({
      message: 'DNA is required'
    });
  }

  const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
  const isMutantResult: boolean = isMutant(dnaParsed);
  return res.status(isMutantResult ? 200 : 403).send(isMutantResult);
}