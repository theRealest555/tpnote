const express = require('express');
const router = express.Router();
const Course = require('../Model/CourseModel');
const { verifyToken } = require('../Middleware/auth');

router.get('/all', verifyToken, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.post('/add', verifyToken, async (req, res) => {
    try {
        const { titre, professeur_id, description, prix } = req.body;
        const newCourse = new Course({ titre, professeur_id, description, prix });
        const data = await newCourse.save();
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const courseId = req.params.id;
        const updatedData = req.body;
        const data = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });

        if (!data) {
            return res.json({ message: 'Cours non trouvé' });
        }

        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const courseId = req.params.id;
        const data = await Course.findByIdAndDelete(courseId);

        if (!data) {
            return res.json({ message: 'Cours non trouvé' });
        }

        res.json({ message: 'Cours supprimé avec succès', data });
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/search', verifyToken, async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const courses = await Course.find({ titre: { $regex: searchTerm, $options: 'i' } });
        res.json(courses);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;