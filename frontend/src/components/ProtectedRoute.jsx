import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ user, role, children }) {
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login/student"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
