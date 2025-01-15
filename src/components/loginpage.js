import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './LoginPage.css';
import Header from './header'; // Update the path if necessary

// Axios instance for API calls
const api = axios.create({
  baseURL: 'http://localhost:5000', // Base URL of your backend
});

function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Signup request
        await api.post('/api/users/signup', formData); // Updated signup route
        alert('Inscription réussie ! Veuillez vous connecter.');
        setIsSignup(false); // Switch to login view
      } else {
        // Login request
        const { data } = await api.post('/api/users/login', {
          email: formData.email,
          password: formData.password,
        });

        // Extract token and user information from the response
        const { token, user } = data;

        // Store the token in localStorage
        localStorage.setItem('token', token);
        navigate('/bookclub');
        // Notify the user of successful login
        alert('Connexion réussie !');

        // Pass user information to the parent component
        onLogin(user);

        // Redirect to the book club page
        
      }

      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      // Handle errors from the backend
      console.log("connection failed")
    }
  };

  return (
    <div className="login-page">
      <Header />
      <section className="login-container">
        <h1>{isSignup ? 'Inscription' : 'Connexion'}</h1>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
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
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button type="submit">{isSignup ? "S'inscrire" : 'Se connecter'}</button>
        </form>
        <p>
          {isSignup ? (
            <span>
              Déjà un compte ?{' '}
              <button onClick={() => setIsSignup(false)}>Connectez-vous</button>
            </span>
          ) : (
            <span>
              Pas de compte ?{' '}
              <button onClick={() => setIsSignup(true)}>Inscrivez-vous</button>
            </span>
          )}
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
