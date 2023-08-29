import clientPromise from "../../middleware/database";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("yard-list");

  if (req.method === 'POST') {
    try {
      const { clientsToUpdate } = req.body; // Make sure to send the clients' data with 'nextDate' property

      const updatePromises = clientsToUpdate.map(async (updatedClient) => {
        const filter = { _id: updatedClient._id };
        const update = { $set: { nextDate: updatedClient.nextDate } };

        try {
          await db.collection('Yards').updateOne(filter, update);
        } catch (updateError) {
          console.error('Error updating client:', updateError);
          throw updateError; // Re-throw the error to be caught by the outer catch block
        }
      });

      await Promise.all(updatePromises);

      client.close();

      res.status(200).json({ message: 'Clients updated successfully' });
    } catch (error) {
      console.error('Error updating clients:', error);
      res.status(500).json({ error: 'An error occurred while updating clients' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
