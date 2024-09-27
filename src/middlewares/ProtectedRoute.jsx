import { Navigate } from "react-router-dom";
import { useUser } from "../CONTEXT/UserContext";

const ProtectedRoute = ({ children }) => {
    const { token } = useUser();
    if (token || !!localStorage.getItem('token')) return children;
    return <Navigate to="/login" />;
};

export default ProtectedRoute;
