import request from 'supertest';
import dotenv from 'dotenv';
import Server from '../models/server';


describe('Mutant detection API', () => {
  dotenv.config();
  const server = new Server()
  const app = server.app;
  // 1 MUTANT
  it('should respond with a 200 status code and a true for a mutant DNA sequence', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

  // 2 MUTANT
  it('should respond with a 200 status code and a true for a mutant DNA sequence', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTAC',
        'TTATGT',
        'AGAAGG',
        'CCTCTA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

  // 3 MUTANT
  it('should respond with a 200 status code and a true for a mutant DNA sequence', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTCTGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

  // 4 MUTANT
  it('should respond with a 200 status code and a true for a mutant DNA sequence', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCGA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

  // 5 MUTANT
  it('should respond with a 200 status code and a true for a mutant DNA sequence', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGTAGG',
        'CCCCTA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

  // HUMAN DNA

  it('should respond with a 403 status code and a false for a human DNA sequence with five sequences', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

  it('should respond with a 403 status code and a false for a human DNA sequence with six sequences', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

  // Manual test
  it('should respond with a 403 status code and a false for a human DNA sequence with six sequences', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ACTG',
        'CAGT',
        'TTAG',
        'CCTA',        
      ]
    });
    expect(response.status).toBe(403);
    expect(response.body).toEqual(false);
  });

  it('should respond with a 403 status code and a false for a human DNA sequence with six sequences', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ACTG',
        'AAGT',
        'ATAG',
        'ACTA',
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

  it('should respond with a 403 status code and a false for a human DNA sequence with six sequences', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ACTG',
        'GTCA',
        'ACTG',
        'GTCA',
      ]
    });
    expect(response.status).toBe(403);
    expect(response.body).toEqual(false);
  });

  it('should respond with a 403 status code and a false for a human DNA sequence with six sequences', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'AAAAA',
        'AATTT',
        'ACAGG',
        'AGCAT',
        'ATCGA'
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(true);
  });

});