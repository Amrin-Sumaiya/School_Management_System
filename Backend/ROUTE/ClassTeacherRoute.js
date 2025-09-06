
import express from "express";
import {  getStudentsByClassAndVersion } from "../CONTROLLER/ClassTeacherController.js";



const route = express.Router();

// route.post("/classteacher", create);
route.get("/attendancebyteacher/class/:class", getStudentsByClassAndVersion)


export default route;
