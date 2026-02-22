import { useNavigate } from "react-router-dom";
import "./styles/loginSelector.css"

export default function LoginSelector() {
  const navigate = useNavigate();

  return (
    <div className="selector-page">
      <div className="selector-box">
        <h1>Library Management System</h1>
        <p>Select how you want to login</p>

        <div className="role-cards">
          <div className="role-card student" onClick={() => navigate("/login/student")}>
            <h2>Student Login</h2>
            <p>Browse books & manage cart</p>
          </div>

          <div className="role-card admin" onClick={() => navigate("/login/admin")}>
            <h2>Admin Login</h2>
            <p>Manage books & members</p>
          </div>
        </div>
      </div>
    </div>
  );
}
