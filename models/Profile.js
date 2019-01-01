const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

//Create Schema
const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    
    sex: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
    }
    
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);