const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/UserModel');
const { verifyToken } = require('../middleware/auth');

router.post('/register', async (req, res) => {
    const { email, nom, mdp } = req.body;

    if (!email || !nom || !mdp) {
        return res.json({ message: "Tous les champs sont obligatoires" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    try {
        const hashedPassword = await bcrypt.hash(mdp, 10);
        const newUser = new User({ email, nom, mdp: hashedPassword });
        const user = await newUser.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ message: error.message });
    }
});

const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET || 'votre_secret_par_defaut', { expiresIn: '1h' });
};

router.post('/login', async (req, res) => {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return res.json({ message: "Tous les champs sont obligatoires" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Email ou mot de passe incorrect' });
        }

        const passwordCheck = await bcrypt.compare(mdp, user.mdp);
        if (!passwordCheck) {
            return res.json({ message: 'Email ou mot de passe incorrect' });
        }

        const tokenData = { user: { id: user.id, email: user.email } };
        const token = generateToken(tokenData);

        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;