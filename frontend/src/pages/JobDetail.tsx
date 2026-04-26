import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobsAPI, applicationsAPI } from "../services/api";
import { Job, Application } from "../types";
import "../styles/JobDetail.css";

export function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<Job | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadJobData();
    }, [id]);

    const loadJobData = async () => {
        try {
            setLoading(true);
            const jobResponse = await jobsAPI.getById(id!);
            setJob(jobResponse.data.data);

            const appsResponse = await applicationsAPI.getByJob(id!);
            setApplications(appsResponse.data.data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="job-detail-container"><p>Loading...</p></div>;
    if (!job) return <div className="job-detail-container"><p>Job not found</p></div>;

    return (
        <div className="job-detail-container">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Back
            </button>

            <div className="job-header">
                <h1>{job.title}</h1>
                <span className={`status ${job.status}`}>{job.status}</span>
            </div>

            <div className="job-details">
                <div className="detail-group">
                    <h3>Job Information</h3>
                    <p>
                        <strong>Department:</strong> {job.department}
                    </p>
                    <p>
                        <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                        <strong>Employment Type:</strong> {job.employment_type}
                    </p>
                    <p>
                        <strong>Salary Range:</strong> ${job.salary_min} - ${job.salary_max}
                    </p>
                    <p>
                        <strong>Posted Date:</strong> {new Date(job.posted_date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Closing Date:</strong> {new Date(job.closing_date).toLocaleDateString()}
                    </p>
                </div>

                <div className="detail-group">
                    <h3>Description</h3>
                    <p>{job.description}</p>
                </div>

                <div className="detail-group">
                    <h3>Applications ({applications.length})</h3>
                    {applications.length === 0 ? (
                        <p>No applications yet</p>
                    ) : (
                        <div className="applications-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Candidate ID</th>
                                        <th>Status</th>
                                        <th>Applied Date</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app.id}>
                                            <td>{app.candidate_id.slice(0, 8)}</td>
                                            <td>
                                                <span className={`status ${app.status}`}>{app.status}</span>
                                            </td>
                                            <td>{new Date(app.applied_date).toLocaleDateString()}</td>
                                            <td>{"⭐".repeat(app.rating || 0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
