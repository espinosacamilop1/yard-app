import {MongoClient} from 'mongodb'

const URL = process.env.MONGODB_URI
const dbname = 'Clients'
const options = {}
let db = null;

let client = new MongoClient(URL, options)

client.connect()

const handler = async (req, res) => {

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
