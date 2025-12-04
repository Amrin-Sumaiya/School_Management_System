import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultOfClassTeacher = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Contains classTeacher id
  const classId = userInfo?.classTeacher;

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

  // 1️⃣ Fetch all students for the class teacher
  useEffect(() => {
    if (!classId) return;

    setLoadingStudents(true);
    axios
      .get(
        `https://backend-just.onrender.com/api/oneclassteacher/attendancebyteacher/class/${classId}`
      )
      .then((res) => {
        setStudents(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setStudents([]);
      })
      .finally(() => setLoadingStudents(false));
  }, [classId]);

  // 2️⃣ Fetch result of the selected student
  useEffect(() => {
    if (!selectedStudent) {
      setStudentData(null);
      return;
    }

    setLoadingResult(true);
    axios
      .get(
        `https://backend-just.onrender.com/api/result/student-result/${selectedStudent}`
      )
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching student result:", err);
        setStudentData({ status: "no-result" });
      })
      .finally(() => setLoadingResult(false));
  }, [selectedStudent]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-serif font-bold text-indigo-700 text-center mb-6">
        My Student's Results
      </h2>

      {/* Student Dropdown */}
      <div className="bg-indigo-100 p-3 rounded mb-5">
        <label className="mr-3 font-thin">All Students:</label>
        {loadingStudents ? (
          <span>Loading students...</span>
        ) : (
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Student</option>
            {students.map((stu) => (
              <option key={stu.id } value={stu.id}>
                {stu.name} — {stu.studentId}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* No student selected */}
      {!selectedStudent && !loadingStudents && (
        <div className="text-center text-gray-600 mt-4">
          Select a student to view results.
        </div>
      )}

      {/* Loading result */}
      {loadingResult && (
        <div className="text-center text-indigo-600 font-semibold">
          Loading result...
        </div>
      )}

      {/* If student has no result */}
      {studentData?.status === "no-result" && !loadingResult && (
        <div className="text-center bg-red-100 text-red-800 p-4 rounded font-semibold">
          No Result Found for this student
        </div>
      )}

      {/* Student has result */}
      {studentData && studentData.subjects && !loadingResult && (
        <div className="bg-indigo-100 p-4 rounded shadow">
          <div className="mb-4 p-3 rounded bg-white space-y-2 text-lg">
            <p>
              <strong className="text-indigo-800">Name:</strong> {studentData.name}
            </p>
            <p>
              <strong className="text-indigo-800">ID:</strong> {studentData.studentId}
            </p>
            <p>
              <strong className="text-indigo-800">Class:</strong> {studentData.class}
            </p>
          </div>

          <h3 className="text-4xl font-serif text-indigo-800 font-bold text-center">
            Academic Result Report
          </h3>
            <br />
            <br />
          <table className="w-full border border-white p-4 rounded shadow bg-indigo-50">
            <thead>
              <tr className="bg-indigo-200">
                <th className="border border-gray-400 p-2 font-serif text-xl">
                  Subject Name
                </th>
                <th className="border border-gray-400 p-2 font-serif text-xl">
                  Total Number
                </th>
                <th className="border border-gray-400 p-2 font-serif text-xl">
                  Grade
                </th>
              </tr>
            </thead>

            <tbody>
              {studentData.subjects.map((sub, index) => (
                <tr key={index}>
                  <td className="border text-center border-gray-400 p-2">{sub.subjectName}</td>
                  <td className="border text-center border-gray-400 p-2">{sub.total}</td>
                  <td className="border text-center border-gray-400 p-2">{sub.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultOfClassTeacher;
