import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./ROUTE/userRoute.js"
import TeacherRoute from "./ROUTE/TeacherRoute.js"
import PaymentRoute from "./ROUTE/FeesRoute.js"
import AttendanceRoute from "./ROUTE/AttendRoute.js"
import ClassRoute from "./ROUTE/classRoutes.js"
import SubjectsRoute from "./ROUTE/SubjectRoute.js"
import ExamRoute from "./ROUTE/ExamRoute.js"
import ResultRoute from "./ROUTE/ResultRoute.js"
import ClassTeacherRoute from "./ROUTE/ClassTeacherRoute.js"

import cors from "cors"



const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
        .connect(MONGOURL)
        .then(()=>{
            console.log("DB connected succefully.")
            app.listen(PORT, ()=>{
                console.log(`Server is running on port :${PORT} `)
            });
        })
        .catch((error) => console.log(error))


app.use("/api", route);
app.use("/api/teachers", TeacherRoute)
app.use("/api/payment", PaymentRoute)
app.use("/api/attendance", AttendanceRoute)
app.use("/api/class", ClassRoute)
app.use("/api/subject", SubjectsRoute)
app.use("/api/exam", ExamRoute)
app.use("/api/result", ResultRoute)
app.use("/api/oneclassteacher", ClassTeacherRoute); 


