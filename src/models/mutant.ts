import mongoose from 'mongoose';

const mutantSchema = new mongoose.Schema({
  count_mutant_dna: {
    type: Number,
    required: true,
    default: 0
  },
  count_human_dna: {
    type: Number,
    required: true,
    default: 0
  }
});

const Mutant = mongoose.model('Mutant', mutantSchema);

export { Mutant };