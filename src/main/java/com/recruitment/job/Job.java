package com.recruitment.job;

import java.time.LocalDate;

public class Job {
    
    private Long id;
    private String title;
    private String company;
    private String location;
    private Double salary;
    private String description;
    private LocalDate postedDate;
    
    public Job() {}
    
    public Job(String title, String company, String location, Double salary, String description, LocalDate postedDate) {
        this.title = title;
        this.company = company;
        this.location = location;
        this.salary = salary;
        this.description = description;
        this.postedDate = postedDate;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getCompany() {
        return company;
    }
    
    public void setCompany(String company) {
        this.company = company;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public Double getSalary() {
        return salary;
    }
    
    public void setSalary(Double salary) {
        this.salary = salary;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDate getPostedDate() {
        return postedDate;
    }
    
    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }
}
