import express from "express"


import {create, getAllStudents, getStudentById ,update, deleteStudent} from "../userController.js"


const route = express.Router()

route.post("/students", create);
route.get("/student", getAllStudents);
route.get("/student/:id", getStudentById);
route.put("/update/student/:id", update);
route.delete("/delete/student/:id", deleteStudent)


export default route;