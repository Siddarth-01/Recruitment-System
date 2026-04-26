import axios from "axios";
import { Job, Application, Candidate } from "../../../shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Jobs API
export const jobsAPI = {
    getAll: (status?: string) =>
        apiClient.get<{ success: boolean; data: Job[] }>("/jobs", { params: { status } }),
    getById: (id: string) =>
        apiClient.get<{ success: boolean; data: Job }>(`/jobs/${id}`),
    create: (data: Omit<Job, "id" | "created_at" | "updated_at">) =>
        apiClient.post<{ success: boolean; data: Job }>("/jobs", data),
    update: (id: string, data: Partial<Job>) =>
        apiClient.put<{ success: boolean; data: Job }>(`/jobs/${id}`, data),
    delete: (id: string) =>
        apiClient.delete<{ success: boolean }>(`/jobs/${id}`),
};

// Candidates API
export const candidatesAPI = {
    getAll: () =>
        apiClient.get<{ success: boolean; data: Candidate[] }>("/candidates"),
    getById: (id: string) =>
        apiClient.get<{ success: boolean; data: Candidate }>(`/candidates/${id}`),
    create: (data: Omit<Candidate, "id" | "created_at" | "updated_at">) =>
        apiClient.post<{ success: boolean; data: Candidate }>("/candidates", data),
    update: (id: string, data: Partial<Candidate>) =>
        apiClient.put<{ success: boolean; data: Candidate }>(`/candidates/${id}`, data),
    addExperience: (candidateId: string, experience: any) =>
        apiClient.post(`/candidates/${candidateId}/experience`, experience),
    addEducation: (candidateId: string, education: any) =>
        apiClient.post(`/candidates/${candidateId}/education`, education),
};

// Applications API
export const applicationsAPI = {
    getByJob: (jobId: string) =>
        apiClient.get<{ success: boolean; data: Application[] }>(`/applications/job/${jobId}`),
    getByCandidate: (candidateId: string) =>
        apiClient.get<{ success: boolean; data: Application[] }>(`/applications/candidate/${candidateId}`),
    getById: (id: string) =>
        apiClient.get<{ success: boolean; data: Application }>(`/applications/${id}`),
    create: (data: { jobId: string; candidateId: string; coverLetter?: string }) =>
        apiClient.post<{ success: boolean; data: Application }>("/applications", data),
    update: (id: string, data: Partial<Application>) =>
        apiClient.put<{ success: boolean; data: Application }>(`/applications/${id}`, data),
    getStats: (jobId: string) =>
        apiClient.get(`/applications/stats/${jobId}`),
};
