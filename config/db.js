const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI_MONGODB); // Pas d'options ici
        console.log(`MongoDB connecté : ${conn.connection.host}`);
    } catch (err) {
        console.error(`Erreur de connexion à MongoDB : ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
