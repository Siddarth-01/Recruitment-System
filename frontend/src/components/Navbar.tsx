import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h1 onClick={() => navigate("/")} className="brand-logo">
                        🎯 Recruitment System
                    </h1>
                </div>

                <div className="navbar-links">
                    {user ? (
                        <>
                            <span className="user-info">
                                Welcome, <strong>{user.name}</strong> ({user.role})
                            </span>
                            <button onClick={() => navigate("/dashboard")} className="nav-button">
                                Dashboard
                            </button>
                            <button onClick={handleLogout} className="nav-button logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/login")} className="nav-button">
                                Login
                            </button>
                            <button onClick={() => navigate("/register")} className="nav-button primary-btn">
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
