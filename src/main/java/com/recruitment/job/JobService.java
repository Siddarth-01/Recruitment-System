package com.recruitment.job;

import com.recruitment.exception.JobNotFoundException;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobService {
    
    private final Map<Long, Job> jobs = new HashMap<>();
    private Long idCounter = 1L;
    
    public Job createJob(Job job) {
        job.setId(idCounter);
        jobs.put(idCounter, job);
        idCounter++;
        return job;
    }
    
    public List<Job> getAllJobs() {
        return jobs.values().stream().collect(Collectors.toList());
    }
    
    public Job getJobById(Long id) {
        return jobs.get(id);
    }
    
    public Job updateJob(Long id, Job jobDetails) {
        Job job = jobs.get(id);
        if (job == null) {
            throw new JobNotFoundException("Job not found with id: " + id);
        }
        
        job.setTitle(jobDetails.getTitle());
        job.setCompany(jobDetails.getCompany());
        job.setLocation(jobDetails.getLocation());
        job.setSalary(jobDetails.getSalary());
        job.setDescription(jobDetails.getDescription());
        job.setPostedDate(jobDetails.getPostedDate());
        
        jobs.put(id, job);
        return job;
    }
    
    public void deleteJob(Long id) {
        if (!jobs.containsKey(id)) {
            throw new JobNotFoundException("Job not found with id: " + id);
        }
        jobs.remove(id);
    }
}
