import express from "express"

import { create, deleteTeacher, getAllTeachers, getTeacherById, update } from "../CONTROLLER/TeacherController.js"

const route = express.Router();

route.post("/teacher", create)
route.get("/all_teachers", getAllTeachers)
route.get("/teacher/:id", getTeacherById)
route.put("/update/teacher/:id", update)
route.delete("/delete/teacher/:id", deleteTeacher)

export default route;

