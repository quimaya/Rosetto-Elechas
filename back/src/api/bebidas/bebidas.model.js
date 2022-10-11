const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tipoBebida = require("../../helpers/constants/bebida")

const schema = new Schema({
    
    nombre: { type: String, unique: false, required: true },  
    imagen: {type:String},
    tipo: {type:String, enum:tipoBebida},
    marca: {type: String},
    grados: {type:String},
    precio: {type:String},
    ingredientes: {type:String}

    

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('habs', schema);