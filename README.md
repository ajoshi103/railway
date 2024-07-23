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