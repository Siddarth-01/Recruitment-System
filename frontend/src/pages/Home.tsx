import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginPage, RegisterPage } from "./Auth";
import { Dashboard } from "./Dashboard";
import { JobsList } from "./JobsList";
import "../styles/Home.css";

export function Home() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return (
            <div className="home-container">
                <div className="hero-section">
                    <h1>Welcome to Recruitment System</h1>
                    <p>Find your dream job or hire the perfect candidate</p>

                    <div className="cta-buttons">
                        <button onClick={() => navigate("/login")} className="cta-button primary">
                            Login
                        </button>
                        <button onClick={() => navigate("/register")} className="cta-button secondary">
                            Register
                        </button>
                    </div>
                </div>

                <div className="features">
                    <div className="feature-card">
                        <h3>For Candidates</h3>
                        <p>Browse job listings and apply to positions that match your skills</p>
                    </div>
                    <div className="feature-card">
                        <h3>For Recruiters</h3>
                        <p>Post jobs and manage applications from qualified candidates</p>
                    </div>
                    <div className="feature-card">
                        <h3>For Admins</h3>
                        <p>Monitor the entire recruitment system and generate reports</p>
                    </div>
                </div>
            </div>
        );
    }

    return <Dashboard />;
}
