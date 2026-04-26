# Recruitment System

A simple Job Recruitment System built with Spring Boot. This is a RESTful API that allows users to manage job postings.

## Features

- **Create Job Postings**: Post new job opportunities
- **Retrieve Jobs**: Get all jobs or fetch specific job by ID
- **Update Job Postings**: Modify existing job details
- **Delete Job Postings**: Remove job listings
- **Exception Handling**: Centralized exception handling with custom error messages
- **RESTful API**: Clean and intuitive API design

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Build Tool**: Maven
- **Server**: Embedded Tomcat (default Spring Boot)
- **Architecture**: REST API with Service layer pattern

## Project Structure

```
recruitment-system/
├── src/main/java/com/recruitment/
│   ├── RecruitmentApplication.java       # Main Spring Boot application
│   ├── job/
│   │   ├── Job.java                      # Job entity model
│   │   ├── JobController.java            # REST API endpoints
│   │   └── JobService.java               # Business logic
│   └── exception/
│       ├── GlobalExceptionHandler.java   # Centralized exception handling
│       └── JobNotFoundException.java      # Custom exception
├── src/main/resources/
│   └── application.properties            # Application configuration
├── pom.xml                               # Maven dependencies
└── README.md                             # This file
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Siddarth-01/Recruitment-System.git
cd Recruitment-System
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Create a Job Posting
- **POST** `/jobs`
- **Request Body**:
```json
{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "New York, NY",
  "salary": 120000.0,
  "description": "We are hiring experienced software engineers",
  "postedDate": "2024-04-27"
}
```
- **Response**: `201 Created` with job object

### Get All Jobs
- **GET** `/jobs`
- **Response**: `200 OK` with array of job objects

### Get Job by ID
- **GET** `/jobs/{id}`
- **Response**: `200 OK` with job object or `404 Not Found`

### Update a Job Posting
- **PUT** `/jobs/{id}`
- **Request Body**: Same as Create Job
- **Response**: `200 OK` with updated job object

### Delete a Job Posting
- **DELETE** `/jobs/{id}`
- **Response**: `204 No Content`

## Job Object Model

```json
{
  "id": 1,
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "New York, NY",
  "salary": 120000.0,
  "description": "We are hiring experienced software engineers",
  "postedDate": "2024-04-27"
}
```

## Exception Handling

The application uses a global exception handler that catches `JobNotFoundException` and returns:
- **Status**: `404 Not Found`
- **Body**: Error message describing the issue

## Configuration

Key configuration properties in `application.properties`:
- `spring.application.name=job-portal` - Application name
- `server.port=8080` - Server port

## Building for Production

Create a JAR file:
```bash
mvn clean package
```

The JAR file will be created in the `target/` directory.

Run the JAR:
```bash
java -jar target/job-portal-1.0.0.jar
```

## Future Enhancements

- Database integration (JPA/Hibernate)
- User authentication and authorization
- Job search and filtering capabilities
- Application management for job seekers
- Email notifications
- Job recommendations

## License

This project is open source and available under the MIT License.

## Author

Siddharth
