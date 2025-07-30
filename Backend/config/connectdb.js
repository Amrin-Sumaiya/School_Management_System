import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DATABASE_URL);
    console.log('Connected Successfully...');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
