# Railway
An web project for booking and managing railway training booking system.

# Setup

## Prerequisites
- you need ```docker``` to be installed.
- you need ```node js``` to be installed.

## Install dependencies
```bash
npm install
```

# Start services
This starts an ```postgresql``` container at port ```5432```.
```bash
docker compose up -d
```
postgresql server: http://localhost:5432

# Intialize the db
This command is used to initialize the database with the project's schema.
```bash
npm run init_db
```

# Launch development server
This is used to launch an express js development server using nodemon.
```bash
npm run server
```

# Stop services
This is used to stop ```postgresql``` container
```bash
docker compose down
```

# SDE API Round - IRCTC To-Do Checklist

## Project Setup
- [ ] Initialize the project repository (GitHub/Bitbucket/GitLab)
- [ ] Create a `README.md` file with setup, run instructions, and testing guidelines
- [ ] Choose the tech stack (Python Flask/Django, NodeJS/ExpressJS, Java/Springboot)
- [ ] Set up the database (MySQL/PostgreSQL)

## User Management
- [ ] **Register a User**
  - [ ] Create an endpoint to register a new user
- [ ] **Login User**
  - [ ] Create an endpoint for user login with authentication

## Admin Functions
- [ ] **Add a New Train**
  - [ ] Create an endpoint for admins to add a new train with source and destination
  - [ ] Secure this endpoint with an API key

## Train Availability
- [ ] **Get Seat Availability**
  - [ ] Create an endpoint for users to check the availability of trains between two stations

## Booking Functionality
- [ ] **Book a Seat**
  - [ ] Create an endpoint for users to book seats on a specific train
  - [ ] Implement logic to handle simultaneous bookings and avoid race conditions

## Booking Details
- [ ] **Get Specific Booking Details**
  - [ ] Create an endpoint for users to retrieve details of their bookings
  - [ ] Require Authorization Token for access

## Security and Validation
- [ ] **Protect Admin Endpoints**
  - [ ] Implement API key authentication for admin endpoints
- [ ] **Authorization Token Handling**
  - [ ] Ensure endpoints for booking and booking details validate the Authorization Token

## Error Handling and Validation
- [ ] Implement proper error handling for all endpoints
- [ ] Validate user inputs and ensure data integrity

## Testing
- [ ] Write unit tests for all endpoints
- [ ] Perform integration testing to ensure all components work together

## Documentation
- [ ] Update `README.md` with setup instructions, API endpoints, and usage examples
- [ ] Include assumptions and any additional information in the `README.md`

## Submission
- [ ] Push the final code to the repository
- [ ] Ensure the repository is accessible and submit the link as required


