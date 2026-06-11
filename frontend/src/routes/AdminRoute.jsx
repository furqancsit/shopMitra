import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    // console.log(user);
    

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.isAdmin !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;