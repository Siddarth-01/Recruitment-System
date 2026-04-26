export interface Job {
    id: string;
    title: string;
    description: string;
    department: string;
    location: string;
    salary_min: number;
    salary_max: number;
    employment_type: "full-time" | "part-time" | "contract";
    posted_date: string;
    closing_date: string;
    status: "open" | "closed" | "on-hold";
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface Candidate {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    location: string;
    summary: string;
    skills: string[];
    resume_url?: string;
    created_at: string;
    updated_at: string;
}

export interface Application {
    id: string;
    job_id: string;
    candidate_id: string;
    status: "applied" | "reviewed" | "shortlisted" | "rejected" | "accepted";
    applied_date: string;
    cover_letter?: string;
    rating: number;
    notes?: string;
    updated_at: string;
}
