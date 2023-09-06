import { MongoClient } from 'mongodb';
import clientPromise from '<src>/lib/mongo'

const handler = async (req, res) => {
    const client = await clientPromise;
    
    if(req.method === "POST") {
        try {
            const db = await client.db("Clients");
            const updatedClient = req.body.editedClient;

            const {_id, ...updatedFields} = updatedClient;

            // Update the client in the database
            await db.collection('clients').updateOne({DIRECCION: updatedFields.DIRECCION}, { $set: updatedFields });

            // Fetch the updated client from the database
            const updatedClientFromDB = await db.collection('clients').findOne({ DIRECCION: updatedFields.DIRECCION});

            console.log('Updated Client:', updatedClientFromDB);

            res.status(200).json({ message: 'Client updated successfully' });
        } catch(error) {
            res.status(500).json({ error: 'Internal Server Error' });      
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} is not allowed`);
    }
}

export default handler;
