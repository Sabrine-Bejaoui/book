const User = require('../models/User');

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validation des données (à implémenter)
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer un utilisateur par son ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ajouter un livre aux favoris d'un utilisateur
exports.addToFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const book = await Book.findById(req.params.bookId);
        if (!user || !book) {
            return res.status(404).json({ message: 'Utilisateur ou livre non trouvé' });
        }
        user.favorites.push(book._id);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ... d'autres fonctions pour gérer la connexion, la modification de profil, etc.