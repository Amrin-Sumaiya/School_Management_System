import express from "express"

import {create, DeleteResultData, getAllResultsData, 
    getResultById, updateResultData, 
    getFailedStudentsByYear,
     getResultsByClassAndSubject,
      getClassWiseResultForAdmin, getStudentResult,
    getStudentResultForClassTeacher } from "../CONTROLLER/ResultController.js"

const route = express.Router()

route.post("/results", create)
route.get("/all_results_data", getAllResultsData)
route.get("/result_of_/:id", getResultById)
route.put("/update_result_/:id", updateResultData)
route.delete("/delete/result_of_/:id", DeleteResultData)

route.get("/failed_students/:year?", getFailedStudentsByYear)

//class and subject wise result 
route.get("/result-by-class-subject", getResultsByClassAndSubject)
route.get("/admin-results", getClassWiseResultForAdmin) 
route.get("/student-result/:id", getStudentResult);
// all students result api

route.get("/class-teacher-student-result/:id", getStudentResultForClassTeacher);
export default route;