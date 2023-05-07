
export const isMutant = (dna: string[][]): boolean => {
  let sequenceCount: number = 0;
  for (let i = 0; i < dna.length; i++) {
    // Horizontal check
    if (isMutantHorizontal(dna[i])) sequenceCount++;

    for (let j = 0; j < dna[i].length; j++) {
      // Principal diagonal check
      if (isMutantObliquePrimaryDiagonal(dna, i, j)) sequenceCount++;
      // Secondary diagonal check
      if (isMutantObliqueSecondaryDiagonal(dna, i, j)) sequenceCount++;
      // Vertical check
      if (isMutantVertical(dna, i, j)) sequenceCount++;
    }
  }
  return sequenceCount >= 2;
}


const isMutantObliquePrimaryDiagonal = (dna: string[][], i: number, j: number): boolean => {
  return j < dna[i].length - 3 &&
    dna[i][j] === dna[i][j + 1] &&
    dna[i][j] === dna[i][j + 2] &&
    dna[i][j] === dna[i][j + 3];
}

const isMutantObliqueSecondaryDiagonal = (dna: string[][], i: number, j: number): boolean => {
  return i >= 3 &&
    dna[i][j] === dna[i - 1][j] &&
    dna[i][j] === dna[i - 2][j] &&
    dna[i][j] === dna[i - 3][j];
}


const isMutantVertical = (dna: string[][], i: number, j: number): boolean => {
  return i < dna.length - 3 &&
    dna[i][j] === dna[i + 1][j] &&
    dna[i][j] === dna[i + 2][j] &&
    dna[i][j] === dna[i + 3][j];
}

const isMutantHorizontal = (dna: string[]): boolean => {
  // *This regex matches 4 or more consecutive letters  
  const regex: RegExp = /([A|T|C|G])\1{3,}/g;
  return dna.join('').match(regex) ? true : false;
}