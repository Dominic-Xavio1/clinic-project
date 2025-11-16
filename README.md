# Clinic Management System

A comprehensive clinic management system built with React (Vite) and Node.js (Express) for managing patients, appointments, medical reports, and more.

## Features

- **Patient Management**: Register, update, and manage patient records
- **Medical Reports**: Doctors can create detailed medical reports
- **Patient Status Tracking**: Track patient status (healed, in treatment, sick, diagnosis)
- **Reports Dashboard**: Nurses can view all reports created by doctors
- **User Authentication**: Secure login and signup with JWT tokens
- **Role-based Access**: Support for doctors and receptionists

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- React Hook Form
- Zod (validation)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Clinic-project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=3d
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```
   
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   
   Create a `.env` file in the frontend directory (optional for development):
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```
   
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Project Structure

```
Clinic-project/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── patientControllers.js
│   │   └── userControllers.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Report.js
│   │   ├── Appointment.js
│   │   └── user.js
│   ├── routes/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── dashboard-main/
│   │   │   └── ui/
│   │   ├── config/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── vercel.json
└── DEPLOYMENT.md
```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Patients
- `GET /get/patient` - Get all patients
- `GET /register/patient/:id` - Get patient by ID
- `POST /register/patient` - Create patient
- `PUT /register/patient/:id` - Update patient
- `DELETE /register/patient/:id` - Delete patient
- `PUT /register/patient/:id/status` - Update patient status

### Reports
- `GET /register/report` - Get all reports
- `GET /register/report/:patientId` - Get reports for a patient
- `POST /register/report` - Create report

### Appointments
- `POST /register/appointment` - Create appointment

## Environment Variables

See `.env.example` files in both frontend and backend directories for required environment variables.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is private and proprietary.

