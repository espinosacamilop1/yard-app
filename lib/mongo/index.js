import {MongoClient} from 'mongodb'

const URI = process.env.MONGODB_URI
const options = {}

if(!URI) throw new Error('Please add your Mongo URI to .env')

let client = new MongoClient(URI, options)
let clientPromise

if(process.env.NODE_DEV !== "production") {
    if(!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect()
    } else {
        clientPromise = client.connect()
    }
}
console.log(clientPromise)

export default clientPromise
