const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    nombre: { type: String, unique: false, required: true },  
    imagen: {type:String},
    capacidad: {type: String, required: false},
    metros: {type:String},
    precio: {type:String},

    

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('habs', schema);