import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN || '');
    return mongoose.connection.db;
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing database');
  }
}