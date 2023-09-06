import { MongoClient } from 'mongodb';
import clientPromise from '<src>/lib/mongo';

const handler = async (req, res) => {
  const client = await clientPromise;

  if (req.method === 'POST') {
    try {
      const db = await client.db('Clients');

      const updates = req.body.clientsToUpdate; 

    //   return console.log(updates)
      const updatePromises = updates.map(async (update) => {
        const { _id, ...updateFields } = update;

        await db.collection('clients').updateOne({ DIRECCION: updateFields.DIRECCION }, { $set: updateFields });
      });

      await Promise.all(updatePromises);

      res.status(200).json({ message: 'Clients updated successfully' });
    } catch (error) {
      console.error('Error updating clients:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} is not allowed`);
  }
};

export default handler;
