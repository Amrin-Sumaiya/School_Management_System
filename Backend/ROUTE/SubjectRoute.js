import express from "express"

import {create, getAllSubjects} from "../CONTROLLER/SubjectController.js"

const route = express.Router();

route.post("/subjects", create)
route.get("/all_subjects", getAllSubjects)

export default route;