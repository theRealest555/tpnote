const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/UserModel');
const { verifyToken } = require('../middleware/auth');

router.post('/register', async (req, res) => {
  const { email, nom, mdp } = req.body;

  if (!email || !nom || !mdp) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
  }

  try {
    const hashedPassword = await bcrypt.hash(mdp, 10);
    const newUser = new User({ email, nom, mdp: hashedPassword });
    const user = await newUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

router.post('/login', async (req, res) => {
  const { email, mdp } = req.body;

  if (!email || !mdp) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect', status: 401 });
    }

    const passwordCheck = await bcrypt.compare(mdp, user.mdp);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const tokenData = { user: { id: user.id, email: user.email } };
    const token = generateToken(tokenData);

    res.status(200).json({ token , user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;