import clientPromise from '<src>/lib/mongo'
import { MongoClient } from 'mongodb';




const handler = async (req, res) => {
    const client = await clientPromise;
  if (req.method === 'GET') {
      try {
          const db = await client.db('Clients');
          const allClients = await db.collection("clients").find({}).toArray();
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ status: 200, data: allClients }));
      } catch(error) {
      console.error('Error updating clients:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      }
  } else {
                res.setHeader("Allow", ["GET"])
          res.status(425).end(`Method ${req.method} is not allowed`)
  }
    

    
    // console.log(client)
    // switch (req.method) {
    //     case "POST":
    //       let bodyObject = JSON.parse(req.body);
    //       let myPost = await db.collection("clients").insertOne(bodyObject);
    //       res.json(myPost.ops[0]);
    //       break;
    //     case "GET":
    //       const allClients = await db.collection("clients").find({}).toArray();
    //       res.statusCode = 200
    //       res.setHeader('Content-Type', 'application/json')
    //       res.end(JSON.stringify({ status: 200, data: allClients }));
    //       break;
    //     default:
    //       res.setHeader("Allow", ["GET"])
    //       res.status(425).end(`Method ${req.method} is not allowed`)
    //   }
}

export default handler
