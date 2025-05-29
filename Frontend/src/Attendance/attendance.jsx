import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: "Present" | "Absent" }



  // Fetch and sort  students on mount
  useEffect(() => {
    axios.get("http://localhost:8000/api/oneclassteacher/attendancebyteacher/class/8/version/english")
      .then(res => {
        const sorted = res.data.sort((a,b) =>{
          const idA = parseInt(a.studentId, 10);
          const idB = parseInt(b.studentId, 10);
          return idA - idB;
        });
        setStudents(sorted)
      })
      .catch(err => console.error("Error fetching students:", err));
  }, []);

  // Handle checkbox toggle
  const handleToggle = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === "Present" ? "Absent" : "Present"
    }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    try {

      const presentStudents = Object.keys(attendance).filter(id => attendance[id] === "Present");

      if (presentStudents.length === 0){
        toast.warn("No students marked as Present ");
        return;
      }
      
        await axios.post("http://localhost:8000/api/attendance/student_attendance", {
          studentId: presentStudents, 
          date: new Date(),
          status: 'Present',
          remarks: ""
        });
   
      toast.success("Attendance submitted successfully!");
    } catch (error) {
     
      toast.error("Failed to submit attendance.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-900 ">Attendance Sheet (class: 8, Version: English)</h2>

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
              <tr key={student.studentId}>
                <td className="py-2 px-4 border text-center">{student.studentId}</td>
                <td className="py-2 px-4 border text-center">{student.name}</td>
                <td className="py-2 px-4 border text-center w-36">
                  <label className="inline-flex items-center justify-center w-full gap-2">
                    <input
                      type="checkbox"
                      checked={attendance[student.id] === "Present"}
                      onChange={() => handleToggle(student.id)}
                    />
                    <span className='inline-block w-16 text-center'>{attendance[student.id] || "Absent"}</span>
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
