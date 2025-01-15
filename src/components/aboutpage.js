import React from 'react';
import './AboutPage.css';
import Header from './header';

function AboutPage() {
  return (
    <div className="about-page">
      <Header />

      {/* Section de présentation */}
      <section className="about-intro">
        <div className="intro-content">
          <h1>À Propos de Book Club</h1>
          <p>
            Book Club est une plateforme dédiée aux passionnés de lecture. Nous offrons un espace pour découvrir de nouveaux livres,
            échanger des avis et rejoindre des clubs de lecture adaptés à vos intérêts. Que vous soyez un lecteur occasionnel ou un
            passionné, notre mission est de vous connecter avec d'autres amoureux des livres et d'enrichir votre expérience de lecture.
          </p>
        </div>
      </section>

      {/* Section Objectif */}
      <section className="mission">
        <h2>Notre Mission</h2>
        <p>
        Nous voulons rendre la lecture plus enrichissante en la partageant.
         Notre objectif est de réunir les passionnés de livres autour de clubs de 
         lecture thématiques, où ils peuvent discuter, apprendre et se connecter autour
          d'histoires qui les inspirent.
        </p>
      </section>

      {/* Section Équipe */}
      <section className="team">
        <h2>Notre Équipe</h2>
        <div className="team-members">
          {/* Membre 1 */}
          <div className="team-member">
            <img src="https://via.placeholder.com/100" alt="Membre 1" />
            <h4>Oumayma Ben Ahmed</h4>
            <p>Développeur</p>
          </div>

          {/* Membre 2 */}
          <div className="team-member">
            <img src="https://via.placeholder.com/100" alt="Membre 2" />
            <h4>Sabrine Bejaoui</h4>
            <p>Développeur</p>
          </div>

          
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
