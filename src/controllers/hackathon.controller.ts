import { Request, Response } from 'express';


export const checkMutant = (req: Request, res: Response) => {

  const { dna } = req.body;
  if(!dna) {
    return res.status(400).json({
      message: 'DNA is required'
    });
  }
  const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
  const isMutant = isMutantDNA(dnaParsed);
  return isMutant 
         ? res.status(200).send(true) 
         : res.status(403).send(false);
}

const isMutantDNA = (dna: string[][]): boolean => {
  const isMutant = false;
  let sequenceCount = 0;
  // *This regex matches 4 or more consecutive letters
  const regex = /([A|T|C|G])\1{3,}/g; 
  for(let i = 0; i < dna.length - 3; i++) {
    // *Construct row string
    let row: string = dna[i].join('');
    // *Horizontal validator
    if(row.match(regex)) {
      sequenceCount++;
    }
    for(let j = 0; j < dna[i].length; j++) {
      
    }
  }
  console.log(sequenceCount);
  if(sequenceCount >= 2) {
    return true;
  }
  return isMutant;
}