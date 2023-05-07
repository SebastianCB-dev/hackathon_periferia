
export const isMutantObliquePrimaryDiagonal = (dna: string[][], i: number, j: number): boolean => {
  return j < dna[i].length - 3 &&
    dna[i][j] === dna[i][j + 1] &&
    dna[i][j] === dna[i][j + 2] &&
    dna[i][j] === dna[i][j + 3];
}

export const isMutantObliqueSecondaryDiagonal = (dna: string[][], i: number, j: number): boolean => {
  return i >= 3 &&
    dna[i][j] === dna[i - 1][j] &&
    dna[i][j] === dna[i - 2][j] &&
    dna[i][j] === dna[i - 3][j];
}


export const isMutantVertical = (dna: string[][], i: number, j: number): boolean => {
  return i < dna.length - 3 &&
    dna[i][j] === dna[i + 1][j] &&
    dna[i][j] === dna[i + 2][j] &&
    dna[i][j] === dna[i + 3][j];
}

export const isMutantHorizontal = (dna: string[]): boolean => {
  // *This regex matches 4 or more consecutive letters  
  const regex: RegExp = /([A|T|C|G])\1{3,}/g;
  return dna.join('').match(regex) ? true : false;
}