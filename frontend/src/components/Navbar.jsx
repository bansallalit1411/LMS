import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">📚 Library</Link>

      {/* PUBLIC */}
      <Link to="/books">Browse Books</Link>

      {!user && <Link to="/login">Login</Link>}

      {user?.role === "student" && (
        <Link to="/student/dashboard">Dashboard</Link>
      )}

      {user?.role === "admin" && (
        <Link to="/admin/dashboard">Admin Panel</Link>
      )}

      {user && (
        <>
          <span className="role-badge">{user.role}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
