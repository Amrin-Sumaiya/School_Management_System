import express from "express"

import { create, getAllAttendanceRecord, UpdateAttendanceById, getAbsentStudentsForDay } from "../CONTROLLER/AttendController.js"

const route = express.Router()

route.post("/student_attendance", create);
route.get("/all_attendance_record", getAllAttendanceRecord);
route.put("/update_attendance_record/:id", UpdateAttendanceById);
route.get("/absent-students-today", getAbsentStudentsForDay);

export default route;  

