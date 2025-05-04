import express from "express"

import { create, getAllAttendanceRecord, UpdateAttendanceById } from "../CONTROLLER/AttendController.js"

const route = express.Router()

route.post("/student_attendance", create)
route.get("/all_attendance_record", getAllAttendanceRecord)
route.put("/update_attendance_record/:id", UpdateAttendanceById)

export default route;  

