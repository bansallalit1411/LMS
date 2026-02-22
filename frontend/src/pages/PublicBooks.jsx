import React, { useEffect, useState } from "react";
import api from "../api";
import "./PublicBooks.css";

export default function PublicBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pb-loader">📚 Loading library books...</div>;
  }

  return (
    <div className="pb-page">
      {/* HEADER */}
      <div className="pb-hero">
        <h1>Explore Our Library</h1>
        <p>Browse all available books in our digital library</p>
      </div>

      {/* BOOKS */}
      <div className="pb-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="pb-card" key={book._id}>
              <div className="pb-img-wrapper">
                <img
                  src={
                    book.image?.startsWith("http")
                      ? book.image
                      : `http://localhost:4000/uploads/${book.image}`
                  }
                  alt={book.title}
                />
              </div>

              <div className="pb-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <span className="pb-badge">Available</span>
              </div>
            </div>
          ))
        ) : (
          <p className="pb-empty">No books available right now</p>
        )}
      </div>
    </div>
  );
}
