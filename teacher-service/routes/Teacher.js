const express = require('express');
const router = express.Router();

const Teacher = require('../model/TeacherModel');
const { verifyToken } = require('../Middleware/auth');

router.get('/all', verifyToken, async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.post('/add', verifyToken, async (req, res) => {
    try {
        const { name, bio } = req.body;
        const newTeacher = new Teacher({ name, bio });
        const data = await newTeacher.save();
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.post('/assign/:professeur_id/:cours_id', verifyToken, async (req, res) => {
    try {
        const { professeur_id, cours_id } = req.params;
        const teacher = await Teacher.findById(professeur_id);

        if (!teacher) {
            return res.json({ message: 'Professeur non trouvé' });
        }

        teacher.cours.push(cours_id);
        const data = await teacher.save();
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/enrolledStudents/:cours_id', verifyToken, async (req, res) => {
    try {
        const { cours_id } = req.params;
        const students = await Student.find({ cours: cours_id });

        if (!students) {
            return res.json({ message: 'Aucun étudiant inscrit à ce cours' });
        }

        res.json(students);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;