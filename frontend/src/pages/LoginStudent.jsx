import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import "./styles/loginForm.css";

export default function LoginStudent() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/student/dashboard";

  const submit = async () => {
    setError("");

    try {
      const res = await api.post("/auth/login", {
        rollNo,
        password,
      });

      if (res.data.role !== "student") {
        setError("Not a student account");
        return;
      }

      login(res.data);
      navigate(redirectTo, { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page student-theme">
      <section className="login-hero">
        <h1>Student Portal</h1>
      </section>

      <section className="login-section">
        <div className="login-form-card student">
          <h2>Student Login</h2>

          <input
            placeholder="Roll Number"
            onChange={(e) => setRollNo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={submit}>Login</button>

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {error}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}