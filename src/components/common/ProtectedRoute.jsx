// src/components/common/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        // Navigate to /login if user is not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
}