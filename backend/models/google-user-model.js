const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const googleuserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userid: { type: String },
    googleId: {type: String, required:  true},
    imageUrl: {type: String},

});

const GoogleUser = mongoose.model('GoogleUser', googleuserSchema);

module.exports = GoogleUser;

