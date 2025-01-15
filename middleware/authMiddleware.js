const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extrait le token de l'en-tête Authorization

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
    req.user = decoded; // Ajoute les infos utilisateur à la requête
    next();
  } catch (error) {
    console.error('Erreur d\'authentification :', error.message);
    res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = authMiddleware;
