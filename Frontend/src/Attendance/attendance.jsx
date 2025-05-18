import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: "Present" | "Absent" }

  // Fetch students on mount
  useEffect(() => {
    axios.get("http://localhost:8000/api/student")
      .then(res => setStudents(res.data))
      .catch(err => console.error("Error fetching students:", err));
  }, []);

  // Handle checkbox toggle
  const handleToggle = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === "Present" ? "Absent" : "Present"
    }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    try {
      for (const studentId in attendance) {
        await axios.post("http://localhost:8000/api/attendance/student_attendance", {
          studentId: studentId,
          date: new Date(),
          status: attendance[studentId],
          remarks: ""
        });
      }
      toast.success("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Failed to submit attendance.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-900 ">Attendance Sheet</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border">Student ID</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td className="py-2 px-4 border text-center">{student.studentId}</td>
                <td className="py-2 px-4 border text-center">{student.name}</td>
                <td className="py-2 px-4 border text-center">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={attendance[student._id] === "Present"}
                      onChange={() => handleToggle(student._id)}
                    />
                    <span>{attendance[student._id] || "Absent"}</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-300 hover:bg-blue-600 text-black font-bold py-2 px-6 rounded"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
