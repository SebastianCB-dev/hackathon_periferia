// This function receives a 2D array (matrix) representing a DNA sequence

import { Response } from "express";

// and returns a boolean indicating whether the sequence corresponds to a mutant.
export const isMutant = (dna: string[][]): boolean => {
  let sequenceCount: number = 0;
  for (let i = 0; i < dna.length; i++) {
    // Check for horizontal sequences of 4 or more equal letters in each row
    if (isMutantHorizontal(dna[i]))  {
      sequenceCount++;
      console.log('1')
    }
    for (let j = 0; j < dna[i].length; j++) {
      // Check for sequences of 4 or more equal letters in the primary diagonal
      if (isMutantObliquePrimaryDiagonal(dna, i, j)) {
        sequenceCount++;
        console.log('2')
      } 
        
      // Check for sequences of 4 or more equal letters in the secondary diagonal
      if (isMutantObliqueSecondaryDiagonal(dna, i, j)) {
        sequenceCount++;
        console.log('3')
      }
      // Check for sequences of 4 or more equal letters in each column
      if (isMutantVertical(dna, i, j)) {
        sequenceCount++;
        console.log('4')
      }
    }
  }
  console.log(sequenceCount)
  // A DNA sequence is considered mutant if there are at least two sequences of 4 or more equal letters
  return sequenceCount >= 2;
}

// This function checks for sequences of 4 or more equal letters in the primary diagonal.
export const isMutantObliquePrimaryDiagonal = (dna: string[][], i: number, j: number): boolean => {
  return j < dna[i].length - 3 && i < dna.length - 3 &&
    dna[i][j] === dna[i + 1]?.[j + 1] &&
    dna[i][j] === dna[i + 2]?.[j + 2] &&
    dna[i][j] === dna[i + 3]?.[j + 3];
}

// This function checks for sequences of 4 or more equal letters in the secondary diagonal.
export const isMutantObliqueSecondaryDiagonal = (dna: string[][], i: number, j: number): boolean => {
  return i >= 3 && j < dna[i].length - 3 &&
    dna[i][j] === dna[i - 1]?.[j - 1] &&
    dna[i][j] === dna[i - 2]?.[j - 2] &&
    dna[i][j] === dna[i - 3]?.[j - 3];
}

// This function checks for sequences of 4 or more equal letters in each column.
export const isMutantVertical = (dna: string[][], i: number, j: number): boolean => {
  return i < dna.length - 3 &&
    dna[i][j] === dna[i + 1]?.[j] &&
    dna[i][j] === dna[i + 2]?.[j] &&
    dna[i][j] === dna[i + 3]?.[j];
}

// This function checks for sequences of 4 or more equal letters in each row
// using a regular expression that matches 4 or more consecutive letters.
export const isMutantHorizontal = (dna: string[]): boolean => {
  const regex: RegExp = /([A|T|C|G])\1{3,}/g;
  return dna.join('').match(regex) ? true : false;
}

export const DNAValidator = (dna: string[], res: Response): boolean => {
  // Validate if the DNA has the correct format.
  if (!Array.isArray(dna) || dna.length < 4) {
    return false;
  }

  // Validate if the DNA has the correct characters.
  const validCharacters = ['A', 'T', 'C', 'G'];
  const invalidCharacters = dna.filter((dnaRow: string) => 
    dnaRow.split('')
      .filter((character: string) => !validCharacters.includes(character)).length > 0);
  if (invalidCharacters.length > 0) {
    return false;
  }

  // Validate if the DNA has the correct length.
  const invalidLength = dna.filter((dnaRow: string) => dnaRow.length !== dna.length);
  if (invalidLength.length > 0) {
    return false;
  }
  return true;
}