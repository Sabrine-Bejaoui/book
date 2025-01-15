import React, { useState, useEffect } from "react";
import axios from "axios";  // Import Axios
import "./BookClubPage.css";

const api = axios.create({
  baseURL: "http://localhost:5000", // Base URL of your backend
});

function BookClubPage() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", description: "", author: "" });
  const [favorites, setFavorites] = useState([]);

  const verifyToken = () => {
    const token = localStorage.getItem("token");  // Assuming you store the token in localStorage
    if(!token){
      window.location.href = "/login"
    }
  };
  verifyToken();

  useEffect(() => {
    // Initial book data (this should ideally come from an API)
    const initialBooks = [
      { id: 1, title: "Là et Retour Encore", description: "Ajouté par Frodon Sacquet", addedBy: "Frodon Sacquet" },
      { id: 2, title: "Le Seigneur des Anneaux", description: "Ajouté par Bilbon Sacquet", addedBy: "Bilbon Sacquet" },
      { id: 3, title: "Le Silmarillion", description: "Ajouté par Tom Bombadil", addedBy: "Tom Bombadil" },
    ];
    setBooks(initialBooks);
    setFavorites([1]); // Simulate a favorite book for the user
  }, []);

const logout = () =>{
localStorage.removeItem("token");
window.location.href = "/login";

}


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (newBook.title.length < 5 || newBook.description.length < 5 || newBook.author.length < 3) {
      alert("Le titre, la description et l'auteur doivent contenir au moins 3 à 5 caractères.");
      return;
    }

    const newBookData = {
      title: newBook.title,
      description: newBook.description,
      author: newBook.author,
    };

    try {
      // Send the book data to the backend (no token needed)
      const { data } = await api.post("/api/books/ajouter", newBookData);

      // Assuming the API responds with the added book
      setBooks([...books, data.book]);
      setFavorites([...favorites, data.book.id]); // Add to favorites
      setNewBook({ title: "", description: "", author: "" }); // Reset the form
      alert("Livre ajouté avec succès !");
    } catch (error) {
      alert(error);
    }
  };


  const handleFavorite = (bookId) => {
    if (favorites.includes(bookId)) {
      alert("Ce livre est déjà dans vos favoris.");
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
    setFavorites(favorites.filter((id) => id !== bookId)); // Remove from favorites
  };

  return (
    <div className="book-club-page">
      <header className="header">
        <h1>Bienvenue!</h1>
        <button onClick={logout}>deconnexion</button>
      </header>

      <section className="page-container">
        {/* Section to Add a new book */}
        <div className="add-book">
          <h2>Ajouter un nouveau livre</h2>
          <form onSubmit={handleAddBook}>
            <div className="form-group">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                placeholder="Entrez le titre du livre"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newBook.description}
                onChange={handleInputChange}
                placeholder="Entrez une description"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="author">Auteur</label>
              <input
                type="text"
                id="author"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                placeholder="Entrez l'auteur du livre"
                required
              />
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>

        {/* Section to Display the Book List */}
        <div className="all-books">
          <h2>Liste des livres</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>Ajouté par : {book.addedBy}</p>
                {favorites.includes(book.id) ? (
                  <p className="favorite">Ceci est l’un de vos favoris</p>
                ) : (
                  <button onClick={() => handleFavorite(book.id)}>
                    Ajouter aux favoris
                  </button>
                )}
                {book.addedBy === "user" && (
                  <button onClick={() => handleDeleteBook(book.id)} className="delete-button">
                    Supprimer
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default BookClubPage;