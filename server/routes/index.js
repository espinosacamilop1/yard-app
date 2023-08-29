const express = require('express')
const router = express.Router()
const Clients = require('../models/clientsModel')

router.get('/clients', (req, res) => {
    Clients.find({})
        .then(clients => {
            // console.log(clients)
            res.json(clients)
        })
        .catch(err => console.log(err))
})

router.post('/update-clients', async (req, res) => {
    const { clientsToUpdate } = req.body; // Assuming req.body contains the clients array with _id and updatedData

    try {
        const updatePromises = clientsToUpdate.map(async (updatedClient) => {
            const updated = await Clients.findByIdAndUpdate(updatedClient._id, {nextDate : updatedClient.nextDate}, { new: true });
            return updated;
        });

        const updatedClients = await Promise.all(updatePromises);
        res.json(updatedClients);
    } catch (error) {
        console.error('Error updating clients:', error);
        res.status(500).json({ error: 'An error occurred while updating the clients' });
    }
});

router.post('/edit-client', async (req, res)=> {
    const {editedCLient} = req.body;

    try {
        const updated = await Clients.findByIdAndUpdate(editedCLient._id, {
                                                        NOMBRE: editedCLient.NOMBRE, 
                                                        DIRECCION :editedCLient.DIRECCION, 
                                                        TELEFONO :editedCLient.TELEFONO, 
                                                        FRECUENCIA :editedCLient.FRECUENCIA, 
                                                        nextDate :editedCLient.nextDate, 
                                                        PAGO :editedCLient.PAGO})
        console.log(updated)
        return updated;
    } catch(error) {
        console.error('Error editing client:', error);
        res.status(500).json({ error: 'An error occurred while editing client' });
    }
})

router.post('/new-client', async (req, res)=> {
    const {newCLient} = req.body;

    try {
        return await Clients.create(newCLient._id, {newCLient})
    } catch(error) {
        console.error('Error creating client:', error);
        res.status(500).json({ error: 'An error occurred while creating client' });
    }
})


module.exports = router;
