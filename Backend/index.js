import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/connectdb.js';
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
const router = express.Router();
dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: 'http://localhost:5051',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Load Routes
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Everything is Fine!!',
  });
});
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
app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port || 5000}`);
  // Database Connection
  await connectDB(DATABASE_URL);
});
app.use((err, req, res, next) => {
  console.log(err);
});
