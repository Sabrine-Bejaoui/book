import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Ajout de useNavigate
import './Header.css';
import Logo from './assets/logo.png';

function Header() {
  const navigate = useNavigate();  // Initialisation de useNavigate

  const handleButtonClick = () => {
    // Rediriger l'utilisateur vers la page de connexion
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/aboutus">À propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="cta-button">
        {/* On remplace le bouton avec un gestionnaire d'événement */}
        <button onClick={handleButtonClick}>Rejoindre un Club</button>
      </div>
    </header>
  );
}

export default Header;
