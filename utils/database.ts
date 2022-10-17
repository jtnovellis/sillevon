import mongoose, { connect, connection } from 'mongoose';

let isConnected: mongoose.ConnectionStates;

export const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  const mongoUri = process.env.MONGODB_URI;

  if (typeof mongoUri === 'string') {
    const db = await connect(mongoUri);
    isConnected = db.connections[0].readyState;
    console.log(db.connection.db.databaseName);
  }
};

connection.on('connected', () => {
  console.log('Connection with MongoDB is OK');
});

connection.on('error', (err) => {
  console.log('Something went wrong with MongoDB', err);
});
