import { Connection } from 'mongoose';

export const mongooseClientFactory = {
  useFactory: () => ({
    uri: process.env.MONGO_URI,
    connectionFactory: (connection: Connection) => {
      connection.on('connected', () => {
        console.log('Successfully connected to MongoDB', 'MongoDB');
      });

      connection.on('error', (error) => {
        console.error('Error connecting to MongoDB', error, 'MongoDB');
      });

      return connection;
    },
  }),
};
