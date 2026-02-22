import api from "../../api";
import { useEffect, useState } from "react";
import "./admin.css";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await api.get("/cart/admin/requests");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    try {
      await api.patch(`/cart/admin/approve/${id}`);
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    }
  };

  const reject = async (id) => {
    await api.patch(`/cart/admin/reject/${id}`);
    fetchRequests();
  };

  return (
    <div className="card">
      <h3>📄 Book Requests</h3>

      <table className="request-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Book</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.studentId}</td>
              <td>{req.bookId?.title}</td>
              <td>{req.status}</td>
              <td>
                {req.status === "cart" ? (
                  <>
                    <button
                      className="approve"
                      onClick={() => approve(req._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => reject(req._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <strong>
                    {req.status === "approved" && "✅ Approved"}
                    {req.status === "rejected" && "❌ Rejected"}
                    {req.status === "returned" && "🔄 Returned"}
                  </strong>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}