import { useState } from "react";
import api from "../../api";
import "./admin.css";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    image: "",
    quantity: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await api.post("/admin/add-book", {
        title: form.title,
        author: form.author,
        image: form.image,
        quantity: Number(form.quantity),
      });

      setMsg("✅ Book added successfully");

      setForm({
        title: "",
        author: "",
        image: "",
        quantity: "",
      });
    } catch (err) {
      setMsg("❌ Failed to add book");
    }
  };

  return (
    <div className="card">
      <h3>Add Book</h3>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          min="0"
          required
        />

        <button type="submit">Add Book</button>
      </form>

      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}