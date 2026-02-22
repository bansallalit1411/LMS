import React, { useEffect, useState, useRef } from "react";
import api from "../api";
import "./student/StudentDashboard.css";

const Books = ({ studentId, studentName }) => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const cartRef = useRef(null);
  const [showCart, setShowCart] = useState(false);

  /* FETCH BOOKS */
  useEffect(() => {
    api.get("/books").then((res) => setBooks(res.data));
  }, []);

  /* FETCH CART */
  useEffect(() => {
    if (!studentId) return;
    api.get(`/cart/student/${studentId}`).then((res) =>
      setCart(res.data)
    );
  }, [studentId]);

  /* SCROLL ANIMATION */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowCart(true),
      { threshold: 0.2 }
    );

    if (cartRef.current) observer.observe(cartRef.current);
    return () => observer.disconnect();
  }, []);

  /* ADD BOOK */
  const handleAddToCart = async (book) => {
    const alreadyRequested = cart.some(
      (item) =>
        item.bookId?._id === book._id &&
        (item.status === "cart" || item.status === "approved")
    );

    if (alreadyRequested) return;

    await api.post("/cart/add", {
      studentId,
      bookId: book._id,
    });

    const res = await api.get(`/cart/student/${studentId}`);
    setCart(res.data);
  };

  /* REMOVE BOOK (waiting only) */
  const handleRemoveFromCart = async (item) => {
    await api.delete("/cart/remove", {
      data: {
        studentId,
        bookId: item.bookId?._id,
      },
    });

    const res = await api.get(`/cart/student/${studentId}`);
    setCart(res.data);
  };

  /* RETURN BOOK */
  const handleReturnBook = async (item) => {
    await api.patch(`/cart/return/${item._id}`);

    const res = await api.get(`/cart/student/${studentId}`);
    setCart(res.data);
  };

  return (
    <div className="sd-page">
      <section className="sd-hero">
        <h1>Welcome, {studentName} 👋</h1>
        <p>Explore books and manage your library requests</p>
      </section>

      {/* BOOKS */}
      <section className="sd-books-section">
        <h2>📚 Available Books</h2>

        <div className="sd-books">
          {books.map((book) => {
            const isAdded = cart.some(
              (item) =>
                item.bookId?._id === book._id &&
                (item.status === "cart" || item.status === "approved")
            );

            return (
              <div className="sd-book-card" key={book._id}>
                <img
                  src={
                    book.image?.startsWith("http")
                      ? book.image
                      : `http://localhost:4000/uploads/${book.image}`
                  }
                  alt={book.title}
                />

                <h4>{book.title}</h4>
                <p>{book.author}</p>

                <button
                  className={`add-btn ${isAdded ? "added-btn" : ""}`}
                  onClick={() => handleAddToCart(book)}
                >
                  {isAdded ? "Book Added" : "Add Book"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* CART */}
      <section
        ref={cartRef}
        className={`sd-cart-section ${showCart ? "show" : ""}`}
      >
        <h2>📦 Your Requests</h2>

        {cart.length === 0 ? (
          <p className="empty">No books requested</p>
        ) : (
          <>
            {/* HEADER (NO QUANTITY) */}
            <div className="sd-cart-header">
              <span>Book Name</span>
              <span>Author</span>
              <span>Status</span>
              <span className="cart-actions-header">Actions</span>
            </div>

            {/* ROWS */}
            {cart
              .filter((item) => item.bookId)
              .map((item) => (
                <div className="sd-cart-row" key={item._id}>
                  <span className="col book">
                    {item.bookId?.title}
                  </span>

                  <span className="col author">
                    {item.bookId?.author}
                  </span>

                  <span className={`col status ${item.status}`}>
                    {item.status === "cart" && "Waiting"}
                    {item.status === "approved" && "Approved"}
                    {item.status === "rejected" && "Rejected"}
                    {item.status === "returned" && "Returned"}
                  </span>

                  <span className="col actions">
                    {item.status === "cart" && (
                      <button
                        className="cart-remove"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        ✖
                      </button>
                    )}

                    {item.status === "approved" && (
                      <button
                        className="approve-btn"
                        onClick={() => handleReturnBook(item)}
                      >
                        Return
                      </button>
                    )}

                    {item.status === "rejected" && (
                      <span className="final-status">
                        Rejected
                      </span>
                    )}

                    {item.status === "returned" && (
                      <span className="final-status">
                        Returned
                      </span>
                    )}
                  </span>
                </div>
              ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Books;