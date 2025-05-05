import express from "express"

import {create, deleteSubjectData, getAllSubjects, getSubjectById, update} from "../CONTROLLER/SubjectController.js"

const route = express.Router();

route.post("/subjects", create)
route.get("/all_subjects", getAllSubjects)
route.get("/specific_subject/:id", getSubjectById)
route.put("/update/:id", update)
route.delete("/delete_subject/:id", deleteSubjectData)

export default route;