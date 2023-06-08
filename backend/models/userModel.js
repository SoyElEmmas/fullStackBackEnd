const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[ true, 'Vaya! se te olivdo mencionar tu nombre. Por favor teclealo']
    },
    email:{
        type: String,
        required:[true, 'Falta que me indiques tu correo electrónico'],
        unique:true
    },
    password:{
        type:String,
        required:[ true, 'Vaya! Es necesario e importante el password. Por favor teclealo']
    }
}, {timestamps: true})

module.exports = mongoose.model('user',userSchema)