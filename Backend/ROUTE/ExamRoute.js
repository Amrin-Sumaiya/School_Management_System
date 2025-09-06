import express from "express"

import { create, deleteExamData, getAllExams, getExamDataById,  updateExamData } from "../CONTROLLER/ExamController.js"

const route = express.Router();

route.post("/exams", create)
route.get("/all_exams", getAllExams)
route.get("/specific_exam_Info/:id", getExamDataById)
route.put("/update/:id", updateExamData)
route.delete("/delete/:id", deleteExamData)

export default route;