const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const TeacherSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    bio: { type: String, required: true },
    cours: [String]
});

TeacherSchema.plugin(AutoIncrement, { inc_field: 'id' });
const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;