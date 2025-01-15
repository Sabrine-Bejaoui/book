import React from 'react';
import './HomePage.css';  // Styles personnalisés
import Header from './header';

// Importez les images depuis le dossier src/assets/images/
import fictionImage from './assets/FictionImage.jpg'; // Image pour le Club de Fiction
import nonFictionImage from './assets/Nonfiction.webp'; // Image pour le Club de Non-Fiction
import scienceFictionImage from './assets/sciencefiction.png'; // Image pour le Club de Science Fiction

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      
      {/* Section héro avec un design épuré */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenue au Book Club</h1>
          <p>Explorez des livres fascinants, partagez vos critiques et rejoignez une communauté passionnée.</p>
        </div>
      </section>

      {/* Section des clubs avec des cards dynamiques */}
      <section className="clubs" id="clubs">
        <h2>Nos Clubs de Lecture</h2>
        <div className="club-cards">
          {/* Card pour le Club de Fiction */}
          <div className="club-card">
            <img src={fictionImage} alt="Club de Fiction" /> {/* Utilisation de l'image importée */}
            <h4>Club de Fiction</h4>
            <p>Rejoignez notre club de fiction et plongez dans des histoires captivantes.</p>
            <button>Voir Plus</button>
          </div>

          {/* Card pour le Club de Non-Fiction */}
          <div className="club-card">
            <img src={nonFictionImage} alt="Club de Non-Fiction" /> {/* Utilisation de l'image importée */}
            <h4>Club de Non-Fiction</h4>
            <p>Pour les amateurs de livres inspirants et enrichissants.</p>
            <button>Voir Plus</button>
          </div>

          {/* Card pour le Club de Science Fiction */}
          <div className="club-card">
            <img src={scienceFictionImage} alt="Club de Science Fiction" /> {/* Utilisation de l'image importée */}
            <h4>Club de Science Fiction</h4>
            <p>Explorez des mondes imaginaires et des technologies du futur.</p>
            <button>Voir Plus</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;