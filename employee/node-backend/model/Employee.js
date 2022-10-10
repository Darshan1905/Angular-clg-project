// Now here i m going to create schema 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Employee = new Schema({
    name: {
        type: String
    },
    price: {
        type: String

    },
    description: {
        type: String

    }
});

// Dont forgot to export module

module.exports = mongoose.model('Employee', Employee)