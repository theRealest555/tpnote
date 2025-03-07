const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);



const CourseSchema = new Schema({
    id: { type: Number, unique: true },
    titre: { type: String, required: true },
    professeur_id: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
});

CourseSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Course', CourseSchema);