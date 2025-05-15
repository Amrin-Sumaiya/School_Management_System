import express from "express"

import {create, DeleteResultData, getAllResultsData, getResultById, updateResultData } from "../CONTROLLER/ResultController.js"

const route = express.Router()

route.post("/results", create)
route.get("/all_results_data", getAllResultsData)
route.get("/result_of_/:id", getResultById)
route.put("/update_result_/:id", updateResultData)
route.delete("/delete/result_of_/:id", DeleteResultData)

export default route;