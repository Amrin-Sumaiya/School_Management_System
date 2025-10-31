import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/connectdb.js';

// Import routes
import AttendanceRoute from './ROUTE/AttendRoute.js';
import ClassRoute from './ROUTE/classRoutes.js'; 
import ClassTeacherRoute from './ROUTE/ClassTeacherRoute.js'; 
import ExamRoute from './ROUTE/ExamRoute.js';
import PaymentRoute from './ROUTE/FeesRoute.js';
import ResultRoute from './ROUTE/ResultRoute.js';
import SubjectsRoute from './ROUTE/SubjectRoute.js';
import TeacherRoute from './ROUTE/TeacherRoute.js';
import userRoleRoutes from './ROUTE/userRoleRoutes.js';
import route from './ROUTE/userRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

// __dirname setup for ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic CORS configuration (Fix)
const allowedOrigins = [
  // 'https://defense2323.netlify.app', // production frontend
  'http://localhost:5051', // local development
  // 'http://localhost:3000', // alternative local dev port (optional)
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(' Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'Everything is Fine!! ✅',
  });
});

// Load routes
app.use('/api', route);
app.use('/api/user-role', userRoleRoutes);
app.use('/api/teachers', TeacherRoute);
app.use('/api/payment', PaymentRoute);
app.use('/api/attendance', AttendanceRoute);
app.use('/api/class', ClassRoute);
app.use('/api/subject', SubjectsRoute);
app.use('/api/exam', ExamRoute);
app.use('/api/result', ResultRoute);
app.use('/api/oneclassteacher', ClassTeacherRoute);

// Global error handler (optional improvement)
app.use((err, req, res, next) => {
  console.error(' Global Error Handler:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start server and connect DB
app.listen(port, async () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
  try {
    await connectDB(DATABASE_URL);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
});