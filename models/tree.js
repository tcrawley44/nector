const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

//create schema
const NodeSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    children: {
        type: [String]

    }

    

});

module.exports = node = mongoose.model('node', NodeSchema);