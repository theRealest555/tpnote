const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const StudentSchema = new Schema({
    id: { type: Number, unique: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cours: [String]
});

StudentSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;