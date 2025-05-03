import express from "express"
import {create, getAllClassInfo, getClassroomById } from "../Class_Controller/classController.js"


const route = express.Router();

route.post("/class_Info", create)
route.get("/all_classInfo", getAllClassInfo)
route.get("/classes/:id", getClassroomById)

export default route; 