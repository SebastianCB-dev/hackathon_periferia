import mongoose from 'mongoose';

const mutantSchema = new mongoose.Schema({
  dna: {
    type: Array,
    required: true
  },
  isMutant: {
    type: Boolean,
    required: true
  }
});

const Mutant = mongoose.model('Mutant', mutantSchema);

export { Mutant };