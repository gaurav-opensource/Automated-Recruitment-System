import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  // While checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    const fallback = user.role === "hr" ? "/hr/dashboard" : "/student/dashboard";
    return <Navigate to={fallback} replace />;
  }

  // Authorized
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
