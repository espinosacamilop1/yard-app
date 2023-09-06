import {MongoClient} from 'mongodb'

const URI = process.env.MONGODB_URI
const options = {}

if(!URI) throw new Error('Please add your Mongo URI to .env')
console.log('this is URI: ', URI)

let client = new MongoClient(URI, options)
let clientPromise

if(process.env.NODE_DEV !== "production") {
    if(!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect()
    } else {
        clientPromise = client.connect()
    }
}

const handler = async (req, res) => {
    const client = await clientPromise
    db = await client.db(dbname);

    switch (req.method) {
        case "POST":
          let bodyObject = JSON.parse(req.body);
          let myPost = await db.collection("clients").insertOne(bodyObject);
          res.json(myPost.ops[0]);
          break;
        case "GET":
          const allClients = await db.collection("clients").find({}).toArray();
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ status: 200, data: allClients }));
          break;
        default:
          res.setHeader("Allow", ["GET"])
          res.status(425).end(`Method ${req.method} is not allowed`)
      }
}

export default handler
