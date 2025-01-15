import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/home';
import AboutPage from './components/aboutpage';
import ContactPage from './components/contactpage';
import LoginPage from './components/loginpage';
import BookClubPage from './components/BookClubPage';
import reportWebVitals from './reportWebVitals';

// Composant pour protéger une route si l'utilisateur n'est pas connecté

function AppRouter() {
  const [setUser] = useState(null); // État pour suivre l'utilisateur connecté

  // Fonction pour gérer la connexion
  const handleLogin = (username) => {
    setUser(username); // Enregistre l'utilisateur connecté
  };

  // Fonction pour gérer la déconnexion


  // Configuration des routes avec gestion utilisateur
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/aboutus",
      element: <AboutPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/login",
      element: <LoginPage onLogin={handleLogin} />, // Passe la fonction de connexion au composant LoginPage
    },
    {
      path: "/bookclub",
      element:<BookClubPage/>
    },
  ]);

  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
