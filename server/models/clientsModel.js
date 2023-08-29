const mongoose = require('mongoose')
const schema = mongoose.Schema

const clientsModel = new schema({
    NOMBRE : {type: String},
    DIRECCION : {type: String},
    FRECUENCIA : {type: String},
    TELEFONO : {type: String},
    nextDate : {type: String},
    PAGO : {type: String}
})

module.exports = mongoose.model('clients', clientsModel)