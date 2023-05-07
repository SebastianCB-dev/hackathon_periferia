import { Request, Response } from 'express';

import { DNAValidator, isMutant } from '../helpers/mutant.helper';
import { saveMutant, thereIsAMutant } from '../helpers/db.helper';
import { Mutant } from '../models/mutant';

// Controller that handles the request to check if the DNA is mutant.
// If the DNA is mutant, it returns a status 200 and a message of true.
// If it is not mutant, it returns a status 403 and a message of false.
export const checkMutant = async (req: Request, res: Response) => {
  const { dna } = req.body;

  if (!dna) {
    return res.status(400).json({
      message: 'DNA is required'
    });
  }

  // Validators of the DNA if is a valid array NxN.
  DNAValidator(dna, res);

  // Validate if the DNA already exists in the database.
  const mutant = await thereIsAMutant(dna);
  if (mutant) {
    return res.status(mutant.isMutant ? 200 : 403).send(mutant.isMutant);
  }

  const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
  const isMutantResult: boolean = isMutant(dnaParsed);
  // Save to database
  await saveMutant(dna, isMutantResult);
  // Return result
  return res.status(isMutantResult ? 200 : 403).send(isMutantResult);
}


// Controller that handles the request to get the stats of the DNA.
// It returns a status 200 and the stats of the DNA.
export const getStats = async (req: Request, res: Response) => {
  const mutants = await Mutant.find({ isMutant: true });
  const humans = await Mutant.find({ isMutant: false });
  let ratio = 0;
  if(humans.length > 0){
    ratio = mutants.length / humans.length;
  }

  return res.status(200).json({
    count_mutant_dna: mutants.length,
    count_human_dna: humans.length,
    ratio: ratio
  });
}