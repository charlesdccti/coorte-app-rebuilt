// Business.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Business = new Schema({
  person_name: {
    type: String
  },
  business_name: {
    type: String
  },
  n: {
    type: String
  },
  variavel: {
    type: String
  },
  business_gst_number: {
    type: Number
  }
},{
    //collection: 'univariada'
    collection: 'dictionary'
});

module.exports = mongoose.model('Business', Business);