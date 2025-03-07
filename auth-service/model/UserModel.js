const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const UserModel = new Schema({
    id: { type: Number , unique: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true },
}, { versionKey: false});


UserModel.plugin(AutoIncrement, { inc_field: 'id' });
const User = mongoose.model('User', UserModel);
module.exports = User;