# Student Management System

A modern student management system built with React, Tailwind CSS, Material UI, and Laravel. This application allows you to manage students, teachers, classrooms, subjects, and timetables effectively.

## Features

- **Student Management**: Add, view, edit, and delete student records.
- **Teacher Management**: Add, view, edit, and delete teacher records.
- **Classroom Management**: Create, read, update, and delete classrooms. Assign students and teachers to classrooms.
- **Subject Management**: Create, read, update, and delete subjects. Assign subjects to classes and teachers.
- **Timetable Management**: Create and manage class schedules. Assign teachers and subjects to timetable slots.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Material UI
- **Backend**: Laravel
- **Database**: MySQL (or any other supported by Laravel)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for frontend)
- [PHP](https://www.php.net/) (for backend)
- [Composer](https://getcomposer.org/) (for Laravel dependencies)
- [MySQL](https://www.mysql.com/) or any other database supported by Laravel

### Installation

#### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/student-management-system.git
cd student-management-systemNavigate to the backend directory:

    cd backend

Install PHP dependencies:

    composer install

Set up environment variables:


    cp .env.example .env

Generate the application key:


    php artisan key:generate

Run database migrations:

    php artisan migrate

Start the Laravel development server:

    php artisan serve

Frontend Setup
Navigate to the frontend directory:

    cd ../frontend

Install JavaScript dependencies:

    npm install

Start the React development server:

    npm start

2-Configuration

    Backend: Make sure your .env file in the backend directory is configured with the correct database credentials and other environment settings.
    Frontend: Ensure the API endpoints in the frontend code match those provided by your Laravel backend.

Usage

    Frontend: Access the application at http://localhost:3000 (or the port configured in your React app).
    Backend: API endpoints are accessible at http://localhost:8000/api.

API Endpoints
Students

    GET /api/students: List all students
    POST /api/students: Create a new student
    GET /api/students/{id}: Get a specific student
    PATCH /api/students/{id}: Update a student
    DELETE /api/students/{id}: Delete a student

Teachers

    GET /api/teachers: List all teachers
    POST /api/teachers: Create a new teacher
    GET /api/teachers/{id}: Get a specific teacher
    PATCH /api/teachers/{id}: Update a teacher
    DELETE /api/teachers/{id}: Delete a teacher

Classrooms

    GET /api/classes: List all classrooms
    POST /api/classes: Create a new classroom
    GET /api/classes/{id}: Get a specific classroom
    PATCH /api/classes/{id}: Update a classroom
    DELETE /api/classes/{id}: Delete a classroom
    POST /api/classes/{id}/students: Assign students to a classroom
    POST /api/classes/{id}/teachers: Assign teachers to a classroom

Subjects

    GET /api/subjects: List all subjects
    POST /api/subjects: Create a new subject
    GET /api/subjects/{id}: Get a specific subject
    PATCH /api/subjects/{id}: Update a subject
    DELETE /api/subjects/{id}: Delete a subject

Timetables

    GET /api/timetables: List all timetables
    POST /api/timetables: Create a new timetable
    GET /api/timetables/{id}: Get a specific timetable
    PATCH /api/timetables/{id}: Update a timetable
    DELETE /api/timetables/{id}: Delete a timetable

Acknowledgements

    React
    Tailwind CSS
    Material UI
    Laravel
