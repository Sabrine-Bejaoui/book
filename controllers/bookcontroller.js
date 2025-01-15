const Book = require('../models/Book');

// Créer un nouveau livre
exports.createBook = async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const book = new Book({ title, author, description, createdBy: req.user._id });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer tous les livres
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer un livre par son ID
exports.getBookById = async (req, res) => {
    // ... code similaire à getUserById
};

// ... d'autres fonctions pour gérer la modification, la suppression, etc.