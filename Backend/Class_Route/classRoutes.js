import express from "express"
import {create, deleteClassInfo, getAllClassInfo, getClassroomById, update } from "../Class_Controller/classController.js"


const route = express.Router();

route.post("/class_Info", create)
route.get("/all_classInfo", getAllClassInfo)
route.get("/classes/:id", getClassroomById)
route.put("/update/class_info/:id", update)
route.delete("/delete/class_info/:id", deleteClassInfo)

export default route; 