const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserModel = new Schema({
    id: { type: string , unique: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true },
}, { versionKey: false});

const User = mongoose.model('User', UserModel);
module.exports = User;