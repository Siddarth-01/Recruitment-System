import { useState, useEffect } from "react";
import { jobsAPI } from "../services/api";
import { Job } from "../types";
import { useNavigate } from "react-router-dom";
import "../styles/JobsList.css";

export function JobsList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("open");
    const navigate = useNavigate();

    useEffect(() => {
        loadJobs();
    }, []);

    useEffect(() => {
        filterJobs();
    }, [jobs, searchTerm, filterStatus]);

    const loadJobs = async () => {
        try {
            setLoading(true);
            const response = await jobsAPI.getAll();
            setJobs(response.data.data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterJobs = () => {
        let filtered = jobs;

        if (filterStatus !== "all") {
            filtered = filtered.filter((job) => job.status === filterStatus);
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (job) =>
                    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredJobs(filtered);
    };

    if (loading) return <div className="jobs-list-container"><p>Loading...</p></div>;

    return (
        <div className="jobs-list-container">
            <h2>Available Jobs</h2>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by title, department, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="on-hold">On Hold</option>
                </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            {filteredJobs.length === 0 ? (
                <p className="no-results">No jobs found</p>
            ) : (
                <div className="jobs-grid">
                    {filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="job-card"
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="job-card-header">
                                <h3>{job.title}</h3>
                                <span className={`status ${job.status}`}>{job.status}</span>
                            </div>
                            <p className="department">
                                <strong>{job.department}</strong>
                            </p>
                            <p className="location">📍 {job.location}</p>
                            <p className="salary">💰 ${job.salary_min} - ${job.salary_max}</p>
                            <p className="employment-type">{job.employment_type}</p>
                            <p className="description">{job.description.slice(0, 100)}...</p>
                            <p className="posted-date">
                                Posted: {new Date(job.posted_date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
