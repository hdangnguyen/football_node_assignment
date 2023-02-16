import mongoose from 'mongoose';
import dotenv, { config } from 'dotenv';
dotenv.config();

const connect = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || '';
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connect;
