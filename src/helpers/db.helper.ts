import { Mutant } from "../models/mutant";

export const thereIsAMutant = async (dna: string[]) => {
  
  const mutant = await Mutant.findOne({ dna: dna });
  return mutant;
  
}