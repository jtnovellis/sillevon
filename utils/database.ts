import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = () => {
  try {
    mongoose.connect(MONGODB_URI as string);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
