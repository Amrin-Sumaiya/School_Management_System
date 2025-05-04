import express from "express"

import { create, deleteFeesRecord, getAllPayments, getPaymentById, update } from "../CONTROLLER/FeesController.js"

const route = express.Router()

route.post("/fees", create)
route.get("/all_fees",getAllPayments)
route.get("/fees/:id", getPaymentById)
route.put("/update/fees/:id", update )
route.delete("/delete/fees/:id", deleteFeesRecord)

export default route;


