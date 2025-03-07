const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeacherSchema = new Schema({
    id: { type: String, unique: true },
    name: { type: String, required: true },
    bio: { type: String, required: true },
    cours: [String]
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;