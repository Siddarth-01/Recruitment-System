import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { jobsAPI, applicationsAPI, candidatesAPI } from "../services/api";
import { Job, Application } from "../types";
import "../styles/Dashboard.css";

export function Dashboard() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            if (user?.role === "recruiter" || user?.role === "admin") {
                // Load jobs for recruiters/admins
                const jobsResponse = await jobsAPI.getAll();
                setJobs(jobsResponse.data.data || []);
            }

            if (user?.role === "candidate") {
                // Load candidates applications
                const candidateResponse = await candidatesAPI.getAll();
                // Load all applications for the candidate
                if (candidateResponse.data.data.length > 0) {
                    const appsResponse = await applicationsAPI.getByCandidate(
                        candidateResponse.data.data[0].id
                    );
                    setApplications(appsResponse.data.data || []);
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="dashboard-container"><p>Loading...</p></div>;

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user?.name}!</h2>
            {error && <div className="error-message">{error}</div>}

            {user?.role === "recruiter" || user?.role === "admin" ? (
                <div className="dashboard-section">
                    <h3>📋 Jobs ({jobs.length})</h3>
                    {jobs.length === 0 ? (
                        <p>No jobs posted yet.</p>
                    ) : (
                        <div className="jobs-grid">
                            {jobs.map((job) => (
                                <div key={job.id} className="job-card">
                                    <h4>{job.title}</h4>
                                    <p>📍 {job.location}</p>
                                    <p>💼 {job.department}</p>
                                    <p>💰 ${job.salary_min} - ${job.salary_max}</p>
                                    <p>📅 {job.employment_type}</p>
                                    <div className="job-status">
                                        <span className={`status ${job.status}`}>{job.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="dashboard-section">
                    <h3>📬 My Applications ({applications.length})</h3>
                    {applications.length === 0 ? (
                        <p>You haven't applied to any jobs yet.</p>
                    ) : (
                        <div className="applications-list">
                            {applications.map((app) => (
                                <div key={app.id} className="application-item">
                                    <div className="app-header">
                                        <h4>Application ID: {app.id.slice(0, 8)}</h4>
                                        <span className={`status ${app.status}`}>{app.status}</span>
                                    </div>
                                    <p>Applied: {new Date(app.applied_date).toLocaleDateString()}</p>
                                    {app.rating > 0 && <p>Rating: ⭐ {app.rating}/5</p>}
                                    {app.notes && <p>Notes: {app.notes}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
