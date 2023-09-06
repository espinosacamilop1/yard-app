// netlify-functions/my-api.js
const express = require("express");
const server = express();

const Clients = require('../server/models/clientsModel')

server.get('api/clients', (req, res) => {
    Clients.find({})
        .then(clients => {
            console.log(clients)
            res.json(clients)
        })
        .catch(err => console.log(err))
})

module.exports = server;
