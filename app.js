const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookRoutes = require('./routes/BookRoutes');
const userRoutes = require('./routes/UserRoutes');

dotenv.config({ path: './config/.env' });

const app = express();

// Middleware pour parser les requêtes en JSON
app.use(express.json());

// Middleware pour activer CORS
app.use(cors({
  origin: 'http://localhost:3000', // URL du frontend React
  credentials: true, // Autorise les cookies si nécessaire
}));

// Connexion à MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI_MONGODB);
    console.log(`MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB : ${error.message}`);
    process.exit(1); // Arrête le processus en cas d'échec
  }
};

// Initialiser la connexion
connectDB();

// Enregistrement des routes
app.use('/api/books', bookRoutes); // Routes pour les livres
app.use('/api/users', userRoutes); // Routes pour les utilisateurs

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route introuvable" });
});

// Middleware pour gérer les erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur serveur", error: err.message });
});

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
