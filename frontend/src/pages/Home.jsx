import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  const [form, setForm] = useState({
    rollNo: "",
    name: "",
    branch: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await api.post("/auth/register", form);
      setMsg("✅ Account created successfully");
      setForm({ rollNo: "", name: "", branch: "", password: "" });
      setTimeout(() => setShowSignup(false), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Scholars' Central Library</div>

          <div className="nav-links">
            <button className="nav-btn" onClick={() => navigate("/books")}>
              Books
            </button>

            <button
              className="nav-signup"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1>Scholars' Central Library</h1>
          <p>
            A dedicated academic platform designed for efficient
            book management and structured learning.
          </p>

          <div className="hero-actions">
            <button
              className="hero-login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="hero-explore"
              onClick={() => navigate("/books")}
            >
              Explore Books
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="split-section">
        <div className="image-box">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"
            alt="Reading"
          />
        </div>

        <div className="text-box">
          <h2>Focused Academic Environment</h2>
          <p>
            Providing students with organized access to resources,
            ensuring clarity and academic growth.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="split-section reverse">
        <div className="image-box">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
            alt="Library"
          />
        </div>

        <div className="text-box">
          <h2>Structured Resource Management</h2>
          <p>
            Seamlessly manage book requests, returns,
            and approvals within a clean academic system.
          </p>
        </div>
      </section>

      {/* SIGNUP MODAL */}
      {showSignup && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowSignup(false)}
            >
              ✕
            </button>

            <h2>Create Student Account</h2>

            <form onSubmit={handleSignup}>
              <input name="rollNo" placeholder="Roll Number" value={form.rollNo} onChange={handleChange} required />
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
              <input name="branch" placeholder="Branch" value={form.branch} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

              <button type="submit" className="modal-btn">
                Create Account
              </button>
            </form>

            {msg && <p className="msg">{msg}</p>}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <h3>Scholars' Central Library</h3>
          <p>
            Supporting academic excellence through structured
            and accessible resource management.
          </p>
          <span>© 2026 All Rights Reserved</span>
        </div>
      </footer>

    </div>
  );
}