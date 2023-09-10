import clientPromise from '../../../lib/mongo/index'
import { MongoClient } from 'mongodb';


const handler = async (req, res) => {
    
    try {
        const client = await clientPromise;
        const db = client.db("Clients");
 
        const clients = await db
            .collection("clients")
            .find({})
            .toArray();
 
        res.json(clients);
    } catch (e) {
        console.error(e);
    }
 
    
}

export default handler
