// Unitare tests isMutant

import { isMutant, isMutantHorizontal, isMutantObliquePrimaryDiagonal } from "../helpers/mutant.helper";

describe('Mutant', () => {
  it('should be mutant', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAAGG',
      'CCCCTA',
      'TCACTG'
    ];
    const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
    const isMutantResult: boolean = isMutant(dnaParsed);
    expect(isMutantResult).toBe(true);
  });
});

describe('should not be mutant', () => {
  it('should not be mutant', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGACGG',
      'GCGTCA',
      'TCACTG'
    ];
    const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
    const isMutantResult: boolean = isMutant(dnaParsed);
    expect(isMutantResult).toBe(false);
  });
});

describe('validator horizontal', () => {
  it('should be mutant', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGAAGG',
      'CCCCTA',
      'TCACTG'
    ];
    expect(isMutantHorizontal(dna[0].split(''))).toBe(false);
    expect(isMutantHorizontal(dna[1].split(''))).toBe(false);
    expect(isMutantHorizontal(dna[2].split(''))).toBe(false);
    expect(isMutantHorizontal(dna[3].split(''))).toBe(false);
    expect(isMutantHorizontal(dna[4].split(''))).toBe(true);
    expect(isMutantHorizontal(dna[5].split(''))).toBe(false);
  });
});

describe('validator oblique primary diagonal', () => {
  it('should be mutant', () => {
    const dna = [
      'CCCCCC',
      'DADDDD',
      'DDADDD',
      'DDDADD',
      'DDDDAD',
      'TCACTD'
    ];
    const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
    expect(isMutantObliquePrimaryDiagonal(dnaParsed, 1, 1)).toBe(true);
  });

});

describe('validator oblique primary diagonal', () => {
  it('should not be mutant', () => {
    const dna = [
      'CCCCCC',
      'DADDDD',
      'DDADDD',
      'DDDADD',
      'DDDDDD',
      'TCACTD'
    ];
    const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
    expect(isMutantObliquePrimaryDiagonal(dnaParsed, 1, 1)).toBe(false);
  });

});

describe('validator Horizontal', () => {

  it('should be mutant', () => {
    const dna = [
      'CCCCCC',
      'DADDDD',
      'DDADDD',
      'DDDADD',
      'DDDDDD',
      'TCACTD'
    ];
    const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
    expect(isMutantHorizontal(dnaParsed[0])).toBe(true);
  });

  it('should not be mutant', () => {
    const dna = [
      'CCCCCC',
      'DADDDD',
      'FDADDD',
      'DFDAFD',
      'DDDDDC',
      'TCACTD'
    ];
    const dnaParsed: string[][] = dna.map((dnaRow: string) => dnaRow.split(''));
    expect(isMutantHorizontal(dnaParsed[1])).toBe(false);
  });
});
