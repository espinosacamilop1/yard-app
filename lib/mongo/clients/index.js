import clientPromise from ".."

let client  // For connection purposes
let db
let clients  // For the actual clients


async function init() {
    if(db) return
    try {
        client = await clientPromise
        db = await client.db()
        clients = await db.collection('clients')
    } catch (error) {
        throw new Error('Failed to establish connection', error)
    }

}

;(async () => {
    await init()
})()

////////////////////
////// CLIENTS /////
////////////////////

export async function getClients() {
    try {
        if(!clients) await init();
        const result = await clients
            .find({})
            .map(user => ({...user, _id: user._id.toString() }))
            .toArray()

        return {clients : result}
    } catch (error) {
        throw new Error('Failed to fetch clients', error)
    }
}

////////////////////
////// UPDATE CLIENT /////
////////////////////

export async function updateClient(clientId, updatedData) {
    try {
        if (!clients) await init();

        const filter = { _id: clientId };

        const update = {
            $set: updatedData,
        };

        const result = await clients.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            // The update was successful
            return { success: true };
        } else {
            // The client with the specified ID was not found
            throw new Error('Client not found');
        }
    } catch (error) {
        throw new Error('Failed to update client', error);
    }
}

