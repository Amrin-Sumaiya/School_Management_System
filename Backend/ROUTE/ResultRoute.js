import express from "express"

import {create, DeleteResultData, getAllResultsData, 
    getResultById, updateResultData, 
    getFailedStudentsByYear, getResultsByClassAndSubject } from "../CONTROLLER/ResultController.js"

const route = express.Router()

route.post("/results", create)
route.get("/all_results_data", getAllResultsData)
route.get("/result_of_/:id", getResultById)
route.put("/update_result_/:id", updateResultData)
route.delete("/delete/result_of_/:id", DeleteResultData)

route.get("/failed_students/:year?", getFailedStudentsByYear)

//class and subject wise result 
route.get("/result-by-class-subject", getResultsByClassAndSubject)
export default route;