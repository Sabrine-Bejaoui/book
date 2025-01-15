import React, { useState } from 'react';
import './ContactPage.css';
import Header from './header';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simule l'envoi du message (peut être connecté à une API de backend)
    alert('Message envoyé!');
    setFormData({ name: '', email: '', message: '' }); // Réinitialiser le formulaire
  };

  return (
    <div className="contact-page">
      <Header />
      
      <section className="contact-intro">
        <h1>Contactez-Nous</h1>
        <p>
          Vous avez une question, une suggestion ou vous voulez simplement discuter ? 
          N'hésitez pas à nous envoyer un message. Nous sommes toujours heureux de recevoir vos retours.
        </p>
      </section>

      <section className="contact-form">
        <h2>Formulaire de Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit">Envoyer</button>
        </form>
      </section>

      <section className="contact-info">
        <h2>Autres Moyens de Contact</h2>
        <p>Vous pouvez aussi nous contacter via les réseaux sociaux :</p>
        <ul>
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </section>
    </div>
  );
}

export default ContactPage;
