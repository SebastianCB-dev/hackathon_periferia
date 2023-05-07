import { Request, Response } from 'express';


export const checkMutant = (req: Request, res: Response) => {

  const { dna } = req.body;
  if(!dna) {
    return res.status(400).json({
      message: 'DNA is required'
    });
  }

  const isMutant = isMutantDNA(dna);
  return res.status(200).json({
    isMutant
  });
}

const isMutantDNA = (dna: string[][]): boolean => {
  const isMutant = false;
  let sequenceCount = 0;
  

  if(sequenceCount >= 2) {
    return true;
  }
  return isMutant;
}