const { Schema } = require('mongoose')

const user = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
        // UNIQUE hace que mongo no permita que dos usuarios con el mismo email se registren
        // en el fondo crea un indice en la bd para que no cree dos usuarios con el mismo email
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = user