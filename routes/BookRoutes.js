const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Ajouter un livre
router.post("/ajouter", async (req, res) => {
  const { title, description, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Le titre et l’auteur sont obligatoires." });
  }

  try {
    const book = new Book({ title, author, description });
    await book.save();
    res.status(201).json({ message: "Livre ajouté avec succès.", book });
  } catch (error) {
    console.error("Erreur lors de l’ajout du livre:", error.message);
    res.status(500).json({ message: "Erreur du serveur." });
  }
});


// Récupérer tous les livres
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Erreur lors de la récupération des livres:', error.message);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
});

// Mettre à jour un livre
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Livre introuvable.' });
    }

    if (book.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée." });
    }

    // Mise à jour des champs
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;

    const updatedBook = await book.save();
    res.json({ message: 'Livre mis à jour avec succès.', book: updatedBook });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du livre:', error.message);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
});

// Supprimer un livre
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Livre introuvable.' });
    }

    if (book.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée." });
    }

    await book.remove();
    res.json({ message: 'Livre supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du livre:', error.message);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
});

module.exports = router;
