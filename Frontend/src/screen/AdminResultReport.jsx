import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminResultReport = () => {
  const [classList, setClassList] = useState([]);
  const [classFilter, setClassFilter] = useState("");

  const [students, setStudents] = useState([]);
  const [studentFilter, setStudentFilter] = useState("");

  const [resultData, setResultData] = useState(null);

  // 1️⃣ Fetch All Classes
  useEffect(() => {
    axios
      .get("https://backend-just.onrender.com/api/class/all_classInfo")
      .then((res) => {
        setClassList(
          res.data.map((cls) => ({
            id: cls._id,
            name: cls.Class,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  // 2️⃣ Fetch Students Based on Class
  useEffect(() => {
    if (!classFilter) {
      setStudents([]);
      setStudentFilter("");
      setResultData(null);
      return;
    }

    axios
      .get(
        `https://backend-just.onrender.com/api/classlevels-with-students?class=${classFilter}`
      )
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, [classFilter]);

  // 3️⃣ Fetch Result for Selected Student
  useEffect(() => {
    if (!studentFilter) return;

    setResultData(null); // reset state while loading

    axios
      .get(
        `https://backend-just.onrender.com/api/result/student-result/${studentFilter}`
      )
      .then((res) => {
        setResultData(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setResultData({
            status: "empty",
            message: "No Result Found For This Student",
          });
        } else {
          setResultData({
            status: "error",
            message: "Something went wrong while fetching result",
          });
        }
      });
  }, [studentFilter]);

console.log(resultData);
  return (
        <div className='p-2'>
      <div className='rounded-xl p-4'>
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
        All Student's Result Performance
      </h2>

      {/* Class Dropdown */}
      <div className="mb-4 bg-indigo-100 p-3 rounded flex items-center">
        <label className="font-semibold mr-3">Select Class:</label>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Select Class</option>
          {classList.map((cls) => (
            <option value={cls.id} key={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Student Dropdown */}
      {classFilter && (
        <div className="mb-6 bg-indigo-100 p-3 rounded flex items-center">
          <label className="font-semibold mr-3">Select Student:</label>
          <select
            value={studentFilter}
            onChange={(e) => setStudentFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Select Student</option>
            {students.map((stu) => (
              <option value={stu._id} key={stu._id}>
                {stu.name} — {stu.studentId}
              </option>
            ))}
          </select>
        </div>
      )}



      {/* Result Report */}
      {resultData && (
        <div className="border rounded-lg bg-indigo-50 p-6 shadow-md">
          <h3 className="text-2xl font-bold text-indigo-600 text-center mb-4">
           Academic Result Report
          </h3>
                                    {/*  No Result Found Message */}
        {resultData?.status === "empty" && (
          <div className="text-center bg-red-100 p-4 rounded text-red-700 font-semibold">
            No Result Found For This Student
          </div>
        )}

        {/*  Error Message */}
        {resultData?.status === "error" && (
          <div className="text-center bg-yellow-100 p-4 rounded text-yellow-700 font-semibold">
            {resultData.message}
          </div>
        )}
          <div className="mb-4 p-3 rounded bg bg-white space-y-2 text-lg">
          <p>
            <strong className="text-indigo-800" >Name:</strong> {resultData.name}
          </p>
          <p>
            <strong  className="text-indigo-800">ID:</strong> {resultData.studentId}
          </p>
          <p>
            <strong className="text-indigo-800">Class:</strong> {resultData.class}
          </p>
          </div>

          <h4 className="font-semibold text-xl text-center mt-4 mb-2">Result Progress</h4>

          <table className="w-full border">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border border-white p-2">Subject Name</th>
                <th className="border border-white p-2">Total Marks</th>
                <th className="border border-white p-2">Grade</th>
              </tr>
            </thead>


            <tbody>
              {resultData?.subjects?.map((sub, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-white p-3">{sub.subjectName}</td>
                  <td className="border border-white p-3">{sub.total}</td>
                  <td className="border border-white p-3">{sub.grade}</td>
                </tr>
              ))}
              
            </tbody>
            
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminResultReport;
