import clientPromise from '<src>/lib/mongo'
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    const client = await clientPromise;
    const db = await client.db("Clients");
    console.log('this is db: ', db);
    switch (req.method) {
        case "POST":
          let bodyObject = JSON.parse(req.body);
          let myPost = await db.collection("clients").insertOne(bodyObject);
          res.json(myPost.ops[0]);
          break;
        case "GET":
          const allClients = await db.collection("clients").find({}).toArray();
          res.json({ status: 200, data: allClients });
          break;
        default:
          res.setHeader("Allow", ["GET"])
          res.status(425).end(`Method ${req.method} is not allowed`)
      }
}

export default handler
