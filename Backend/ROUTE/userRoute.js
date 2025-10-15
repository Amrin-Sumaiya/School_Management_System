import express from "express"


import {create, 
    getAllStudents,
    getStudentById ,
    update,
    deleteStudent,
    getClassLevels,
getClassLevelWithStudents, getAbsentStudents ,
getStudentsCountByYear
} from "../CONTROLLER/userController.js"

const route = express.Router()

route.post("/students", create);
route.get("/student", getAllStudents);
route.get("/student/:id", getStudentById);
route.get("/classlevels", getClassLevels);
route.get("/classlevels-with-students", getClassLevelWithStudents)
route.put("/update/student/:id", update);
route.delete("/delete/student/:id", deleteStudent);
route.get("/absent-students", getAbsentStudents);
route.get("/admission-yearly_count", getStudentsCountByYear);

export default route;