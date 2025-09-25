import express from "express"

import { create, getAllAttendanceRecord, UpdateAttendanceById, getAbsentStudentsForDay, getAbsentStudentsForDayByTeacher, getPresentStudentsForDayByTeacher, getPresentStudentsForDay, getDailySummaryByTeacher, getAttendancePercentageForDay } from "../CONTROLLER/AttendController.js"

const route = express.Router()

route.post("/student_attendance", create);
route.get("/all_attendance_record", getAllAttendanceRecord);
route.put("/update_attendance_record/:id", UpdateAttendanceById);
route.get("/absent-students-today", getAbsentStudentsForDay);
route.get("/absent-students-today-by-teacherwise", getAbsentStudentsForDayByTeacher);

route.get("/present-students-today", getPresentStudentsForDay);
route.get("/present-students-today-by-teacherwise", getPresentStudentsForDayByTeacher); 
route.get("/daily_summary", getDailySummaryByTeacher);

route.get("/attendance-percentage", getAttendancePercentageForDay);



export default route;  

