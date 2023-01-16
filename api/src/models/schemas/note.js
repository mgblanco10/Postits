const { Schema, Types: { ObjectId } } = require('mongoose')

const note = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    text: {
        type: String,
        default: ''
    },
    //aquí tendriamos la visibilidad de la nota por defecto privada
    visibility: {
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    },
    //guarda la fecha de creación de la nota
    createdAt: {
        type: Date,
        default: Date.now
    },
//se guardaría la última modificación
    modifiedAt: {
        type: Date
    }
})

module.exports = note