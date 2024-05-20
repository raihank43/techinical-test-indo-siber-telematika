# Technical Test PT Indo Siber Telematika

## Question 1: FizzBuzz

## Question 2: Document Management App

### Table Schema Entity Relationship Diagram

<div align="center" >
    <img src="assets/tableSchema.png" alt="Image Description" width="500">
</div>

### Business Process Flowchart

![FlowChart](assets/businessprocess.png)

# Document Management Application

This application is a document management system built using NestJs, Prisma and deployed using Docker.

## How to Use

Follow these steps to run this application:

1. Clone this repository:

```bash
git clone https://github.com/raihank43/technical-test-ist.git
```

2. Navigate to the question_2 directory:

```bash
cd question_2
```

3. Run Docker Compose:

```bash
docker-compose up -d
```

4. After running the above command, Docker will build and run all services defined in docker-compose.yml.

5. Access the application:

```bash
The server runs at http://localhost:3000
The client runs at http://localhost:8080
```

## Configuration

This application requires a Cloudinary URL for uploading documents. You should provide this URL in the CLOUDINARY_URL environment variable in the docker-compose.yml file.

```bash
environment:
  CLOUDINARY_URL: "cloudinary://<your-cloudinary-url>"
```

Replace `<your-cloudinary-url>` with your Cloudinary URL.

# Note

Ensure Docker is installed and running on your machine before running this application.
