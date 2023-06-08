const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    texto: {
        type:String,
        required: [true,'Te falta el texto de la tarea']
    }
},{
    timestamps:true
}
)

module.exports = mongoose.model('Tarea',tareaSchema)