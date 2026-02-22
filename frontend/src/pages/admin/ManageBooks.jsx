import { useEffect, useState } from "react";
import api from "../../api";
import "./admin.css";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  };

  const removeBook = async (id) => {
    const ok = window.confirm("Are you sure?");
    if (!ok) return;

    await api.delete(`/books/${id}`);
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };

  const updateQuantity = async (id, newQty) => {
    if (newQty < 0) return;

    await api.patch(`/admin/update-quantity/${id}`, {
      quantity: newQty,
    });

    setBooks((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, quantity: newQty } : b
      )
    );
  };

  return (
    <div className="card">
      <h3>📚 Manage Books</h3>

      <table className="request-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>
                <img
                  src={
                    book.image?.startsWith("http")
                      ? book.image
                      : `http://localhost:4000/uploads/${book.image}`
                  }
                  alt={book.title}
                  style={{ width: "40px", borderRadius: "4px" }}
                />
              </td>

              <td>{book.title}</td>
              <td>{book.author}</td>

              <td>
                <input
                  type="number"
                  min="0"
                  value={book.quantity}
                  onChange={(e) =>
                    updateQuantity(book._id, Number(e.target.value))
                  }
                  style={{ width: "60px", textAlign: "center" }}
                />
              </td>

              <td>
                <button
                  className="reject"
                  onClick={() => removeBook(book._id)}
                >
                  🗑 Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}