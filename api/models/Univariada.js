// Univariada.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Univariada
let Univariada = new Schema({
  person_name: {
    type: String
  },
  business_name: {
    type: String
  },
  variavel:{
    type: String
  },
  
  business_gst_number: {
    type: Number
  }
},{
    collection: 'univariada'
});

module.exports = mongoose.model('Univariada', Univariada);