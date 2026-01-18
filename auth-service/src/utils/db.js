import mongoose from 'mongoose';
import config from '../config/config.js';

// Set strictQuery to true to enable strict query mode
mongoose.set('strictQuery', true);

const connect = config.MONGO_URI;
const connectDB = async () => {
  try {
    if (!connect) {
      throw new Error('Mongo URI is not defined');
    }
    await mongoose.connect(connect);
    console.log('Database connected');
  } catch (error) {
    console.error(`Error connecting to connectDB: ${error}`);
  }
};

export default connectDB;
