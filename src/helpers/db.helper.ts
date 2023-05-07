import { MongoClient } from 'mongodb';

export const dbConnection = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_CNN || '');
    return client.db('hackathon');
  }
  catch(error)  {
    console.log(error);
    throw new Error('Error initializing database');
  }
}