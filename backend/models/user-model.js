const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String },
    googleId: {type: String },
    id: { type: String },
    imageUrl: {type: String},
    bio: {type: String},

});

const User = mongoose.model('User', userSchema);

module.exports = User;

