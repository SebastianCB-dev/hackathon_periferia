import { Request, Response } from 'express';

import { isMutantHorizontal,
         isMutantObliquePrimaryDiagonal,
         isMutantObliqueSecondaryDiagonal,
         isMutantVertical } from '../helpers/mutant.helper';

export const checkMutant = (req: Request, res: Response) => {
  const { dna } = req.body;

  if (!dna) {
    return res.status(400).json({
      message: 'DNA is required'
    });
  }

  const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
  const result: boolean = isMutant(dnaParsed);
  return result
    ? res.status(200).send(true)
    : res.status(403).send(false);
}

const isMutant = (dna: string[][]): boolean => {
  let sequenceCount: number = 0;
  for (let i = 0; i < dna.length; i++) {
    // Horizontal check
    if (isMutantHorizontal(dna[i])) sequenceCount++;

    for (let j = 0; j < dna[i].length; j++) {
      // Principal diagonal check
      if(isMutantObliquePrimaryDiagonal(dna, i, j)) sequenceCount++;      
      // Secondary diagonal check
      if(isMutantObliqueSecondaryDiagonal(dna, i, j)) sequenceCount++;      
      // Vertical check
      if(isMutantVertical(dna, i, j)) sequenceCount++;
    }
  }
  (sequenceCount >= 2) ? console.log('Es mutante') : console.log('No es mutante');
  return (sequenceCount >= 2) ? true : false;
}
