import request from 'supertest';
import dotenv from 'dotenv';
import Server from '../models/server';

describe('Mutant detection API', () => {
  dotenv.config();
  const server = new Server()
  const app = server.app;
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

  it('should respond with a 403 status code for a human DNA sequence', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(403);
    expect(response.body).toEqual(false);
  });

  it('should respond with a 403 status code for a DNA sequence with an invalid character', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCXTA',
        'TCACTG'
      ]
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'DNA has an incorrect format'
    });
  });

  describe('POST /mutant - invalid DNA format', () => {
    it('should respond with a 400 status code and an error message', async () => {
      const response = await request(app).post('/mutant').send({
        dna: [
          'ATGCGA',
          'CGGTGCD',
          'TTATGT',
          'AGAAGG',
          'CGCGTA',
          'TCACTG'
        ]
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual({
        message: 'DNA has an incorrect format'
      });
    });
  });

  it('should respond with a 400 status code for a DNA sequence with an incorrect format', async () => {
    const response = await request(app).post('/mutant').send({
      dna: [
        'ATGCGA',
        'CAGTGC'
      ]
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'DNA has an incorrect format'
    });
  });



  it('should respond with a 400 status code for a request without a DNA sequence', async () => {
    const response = await request(app).post('/mutant').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'DNA is required'
    });
  });
});
