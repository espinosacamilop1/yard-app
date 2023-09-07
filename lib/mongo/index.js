import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI;
const options = {};

if (!URI) throw new Error('Please add your Mongo URI to .env');

const client = new MongoClient(URI, options);

// Connect to MongoDB once during application startup
export const clientPromise = (async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

// Export the client instance (not a promise)
export default client;
