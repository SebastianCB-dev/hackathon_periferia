import { Request, Response } from 'express';


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
  const isMutant: boolean = false;
  let sequenceCount: number = 0;
  for (let i = 0; i < dna.length; i++) {
    // Horizontal check
    if (isMutantHorizontal(dna[i])) sequenceCount++;

    for (let j = 0; j < dna[i].length; j++) {
      if(j < dna[i].length - 3 && 
         dna[i][j] === dna[i][j + 1] && 
         dna[i][j] === dna[i][j + 2] && 
         dna[i][j] === dna[i][j + 3]) {
        sequenceCount++;
      }
      if(i === 3 && 
         dna[i][j] === dna[i - 1][j] && 
         dna[i][j] === dna[i - 2][j] && 
         dna[i][j] === dna[i - 3][j]) {
        sequenceCount++;
      }
    }
  }
  console.log(sequenceCount);
  if (sequenceCount >= 2) {
    return true;
  }
  return isMutant;
}

const isMutantHorizontal = (dna: string[]): boolean => {
  // *This regex matches 4 or more consecutive letters  
  const regex: RegExp = /([A|T|C|G])\1{3,}/g;
  return dna.join('').match(regex) ? true : false;
}