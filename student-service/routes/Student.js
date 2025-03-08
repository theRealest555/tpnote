const express = require('express');
const router = express.Router();

const Student = require('../model/StudentModel');
const { verifyToken } = require('../Middleware/auth');

router.get('/all', verifyToken, async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.post('/add', verifyToken, async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const data = await newStudent.save();
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.post('/enroll/:etudiant_id/:cours_id', verifyToken, async (req, res) => {
    try {
        const { etudiant_id, cours_id } = req.params;
        const student = await Student.findOne({id : etudiant_id});

        if (!student) {
            return res.json({ message: 'Étudiant non trouvé' });
        }

        student.cours.push(cours_id);
        const data = await student.save();
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/enrolledCourses/:etudiant_id', verifyToken, async (req, res) => {
    try {
        const { etudiant_id } = req.params;
        const student = await Student.findOne({id : etudiant_id});

        if (!student) {
            return res.json({ message: 'Étudiant non trouvé' });
        }

        res.json(student.cours);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;