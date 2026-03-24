// import { useState } from "react";
// import api from "../../api";
// import "./admin.css";

// export default function AddMember() {
//   const [form, setForm] = useState({
//     rollNo:   "",
//     name:     "",
//     branch:   "",
//     email:    "",
//     password: "",
//   });
//   const [showPass, setShowPass] = useState(false);
//   const [msg,      setMsg]      = useState("");
//   const [msgType,  setMsgType]  = useState("");
//   const [loading,  setLoading]  = useState(false);

//   const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     setLoading(true);

//     try {
//       await api.post("/admin/add-student", {
//         rollNo:   form.rollNo.trim(),
//         name:     form.name.trim(),
//         branch:   form.branch.trim(),
//         email:    form.email.trim(),
//         password: form.password,
//       });

//       setMsg("Student added successfully");
//       setMsgType("success");
//       setForm({ rollNo:"", name:"", branch:"", email:"", password:"" });
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Failed to add student");
//       setMsgType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card">
//       <div className="card-header">
//         <div className="card-title">👤 Add Library Member</div>
//       </div>

//       <form onSubmit={handleSubmit} className="form">

//         <div className="form-row">
//           <div className="form-field">
//             <label className="form-label">Roll Number *</label>
//             <input
//               placeholder="e.g. 2024CS001"
//               value={form.rollNo}
//               onChange={set("rollNo")}
//               required
//             />
//           </div>
//           <div className="form-field">
//             <label className="form-label">Full Name *</label>
//             <input
//               placeholder="e.g. Rahul Sharma"
//               value={form.name}
//               onChange={set("name")}
//               required
//             />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-field">
//             <label className="form-label">Branch</label>
//             <input
//               placeholder="e.g. Computer Science"
//               value={form.branch}
//               onChange={set("branch")}
//             />
//           </div>
//           <div className="form-field">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               placeholder="e.g. rahul@college.edu"
//               value={form.email}
//               onChange={set("email")}
//             />
//           </div>
//         </div>

//         <div className="form-field">
//           <label className="form-label">Temporary Password *</label>
//           <div style={{ position:"relative", maxWidth:"480px" }}>
//             <input
//               type={showPass ? "text" : "password"}
//               placeholder="Set a temporary password"
//               value={form.password}
//               onChange={set("password")}
//               required
//               style={{ paddingRight:"44px" }}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPass(!showPass)}
//               style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:"1rem", opacity:.5 }}
//             >
//               {showPass ? "🙈" : "👁️"}
//             </button>
//           </div>
//           <div style={{ fontSize:".68rem", color:"#8B7355", marginTop:"4px" }}>
//             Student can change this after first login
//           </div>
//         </div>

//         <div>
//           <button type="submit" className="btn-primary" disabled={loading}>
//             {loading ? "Adding…" : "👤 Add Member"}
//           </button>
//         </div>
//       </form>

//       {msg && (
//         <p className={`msg ${msgType === "success" ? "msg-success" : "msg-error"}`}>
//           {msgType === "success" ? "✅" : "❌"} {msg}
//         </p>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import api from "../../api";
import "./admin.css";

export default function AddMember() {
  const [form, setForm] = useState({
    rollNo:   "",
    name:     "",
    branch:   "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [msg,      setMsg]      = useState("");
  const [msgType,  setMsgType]  = useState("");
  const [loading,  setLoading]  = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  // Live email preview
  const emailPreview = form.rollNo.trim()
    ? `${form.rollNo.trim().toLowerCase()}@nitkkr.ac.in`
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await api.post("/admin/add-student", {
        rollNo:   form.rollNo.trim(),
        name:     form.name.trim(),
        branch:   form.branch.trim(),
        // email derived on backend — no need to send
        password: form.password,
      });

      setMsg(`Student added — email set to ${emailPreview || form.rollNo + "@nitkkr.ac.in"}`);
      setMsgType("success");
      setForm({ rollNo: "", name: "", branch: "", password: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add student");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">👤 Add Library Member</div>
      </div>

      <form onSubmit={handleSubmit} className="form">

        <div className="form-row">
          <div className="form-field">
            <label className="form-label">Roll Number *</label>
            <input
              placeholder="e.g. 22cseb14"
              value={form.rollNo}
              onChange={set("rollNo")}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">Full Name *</label>
            <input
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={set("name")}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Branch</label>
          <input
            placeholder="e.g. Computer Science &amp; Engineering"
            value={form.branch}
            onChange={set("branch")}
          />
        </div>

        {/* Auto-generated email preview */}
        <div className="form-field">
          <label className="form-label">
            Library Email
            <span style={{ marginLeft:"8px", fontSize:".62rem", color:"#B8860B", fontStyle:"italic", textTransform:"none", letterSpacing:0 }}>
              auto-generated
            </span>
          </label>
          <div style={{
            padding:"11px 16px",
            background: emailPreview ? "rgba(184,134,11,.06)" : "rgba(255,255,255,.02)",
            border:`1px solid ${emailPreview ? "rgba(184,134,11,.3)" : "rgba(184,134,11,.1)"}`,
            borderRadius:"6px",
            display:"flex", alignItems:"center", gap:"10px",
            transition:"all .25s",
          }}>
            <span style={{ fontSize:"1rem", opacity: emailPreview ? 1 : .3 }}>📧</span>
            {emailPreview ? (
              <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:".88rem", color:"#DAA520", fontWeight:500 }}>
                {emailPreview}
              </span>
            ) : (
              <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:".85rem", color:"rgba(196,184,154,.3)" }}>
                Enter roll number to preview email
              </span>
            )}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Password *</label>
          <div style={{ position:"relative", maxWidth:"480px" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Set a password"
              value={form.password}
              onChange={set("password")}
              required
              style={{ paddingRight:"44px" }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:"1rem", opacity:.5 }}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
          <div style={{ fontSize:".68rem", color:"#8B7355", marginTop:"4px" }}>
            Student can change this after first login
          </div>
        </div>

        <div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Adding…" : "👤 Add Member"}
          </button>
        </div>
      </form>

      {msg && (
        <p className={`msg ${msgType === "success" ? "msg-success" : "msg-error"}`}>
          {msgType === "success" ? "✅" : "❌"} {msg}
        </p>
      )}
    </div>
  );
}
