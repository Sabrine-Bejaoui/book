const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// --------------------------
// Route : Inscription d'un utilisateur
// --------------------------
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Inscription réussie.' });
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error.message);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
});

// --------------------------
// Route : Connexion d'un utilisateur
// --------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'L\'email et le mot de passe sont requis.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur introuvable.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    const payload = { id: user.id, firstName: user.firstName, lastName: user.lastName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: payload });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error.message);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
});

// --------------------------
// Route : Récupérer les informations d'un utilisateur connecté
// --------------------------
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération des infos utilisateur :', error.message);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
});

module.exports = router;
