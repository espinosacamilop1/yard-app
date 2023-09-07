import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI;
const options = {};

if (!URI) throw new Error('Please add your Mongo URI to .env');

const client = new MongoClient(URI, options);

if(process.env.NODE_DEV !== "production") {
    if(!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect()
    } else {
        clientPromise = client.connect()
    }
}
console.log(clientPromise)

export default clientPromise
