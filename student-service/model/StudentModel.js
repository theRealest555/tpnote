const mongoose = require('mongoose');
const { Schema } = mongoose;


const StudentSchema = new Schema({
    id: { type: string, unique: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cours: [String]
});


const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;