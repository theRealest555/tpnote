const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
    id: { type: String, unique: true },
    titre: { type: String, required: true },
    professeur_id: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
});

module.exports = mongoose.model('Course', CourseSchema);