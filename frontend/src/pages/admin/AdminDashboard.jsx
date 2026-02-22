import { useState } from "react";
import AddMember from "./AddMember.jsx";
import AddBook from "./AddBook.jsx";
import Requests from "./Requests.jsx";
import ManageBooks from "./ManageBooks.jsx";
import StudentRecords from "./StudentRecords.jsx";
import "./admin.css";

export default function AdminDashboard() {
  const [active, setActive] = useState("requests");

  return (
    <div className="admin-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">📚 LMS Admin</h2>

        <ul>
          <li
            className={active === "requests" ? "active" : ""}
            onClick={() => setActive("requests")}
          >
            📄 Requests
          </li>

          <li
            className={active === "addBook" ? "active" : ""}
            onClick={() => setActive("addBook")}
          >
            ➕ Add Book
          </li>

          <li
            className={active === "addMember" ? "active" : ""}
            onClick={() => setActive("addMember")}
          >
            👤 Add Member
          </li>

          <li
            className={active === "manageBooks" ? "active" : ""}
            onClick={() => setActive("manageBooks")}
          >
            🗑 Manage Books
          </li>

          <li
  className={active === "studentRecords" ? "active" : ""}
  onClick={() => setActive("studentRecords")}
>
  🎓 Student Records
</li>

        </ul>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="admin-main">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage library resources and student requests</p>
        </div>

        <div className="admin-content fade-in">
          {active === "requests" && <Requests />}
          {active === "studentRecords" && <StudentRecords />}
          {active === "addBook" && <AddBook />}
          {active === "addMember" && <AddMember />}
          {active === "manageBooks" && <ManageBooks />}
        </div>
      </main>
    </div>
  );
}
