import { Mutant } from "../models/mutant";

export const thereIsAMutant = async (dna: string[]) => {
  
  const mutant = await Mutant.findOne({ dna: dna });
  return mutant;
  
}

export const saveMutant = async (dna: string[], isMutant: boolean) => {
    
    const mutant = new Mutant({ dna: dna, isMutant: isMutant });
    await mutant.save();
    
}