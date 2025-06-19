import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from "axios";
import { toast } from 'react-toastify';

const All_Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();  // Define navigate function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/student");
        setStudents(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);    

  const deleteStudent = async (studentId) => {

    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/student/${studentId}`);

      setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));

      toast.success(response.data.message, { position: "top-right"});

    }catch (error){
      console.log("Error deleting student: ", error);
      toast.error("Failed to delte student ");
    }


  }

  return (
    <div className="p-4">
      {/* Title and Add Student Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold absolute left-1/2 transform -translate-x-1/2"> Student’s Records</h2>
        <button 
          onClick={() => navigate('/add_student')}  // Navigate to Add Student page
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          <FaUserPlus />
          Add Student
        </button>
      </div>

      {/* Table */}
      <table className='w-full border-collapse border-gray-800'>
        <thead>
          <tr className='bg-gray-300'>
            <th className="border p-4">SI</th>
            <th className="border p-4">Student ID</th>
            <th className="border p-4">Name</th>
            <th className="border p-4">Class</th>
            <th className="border p-4">Age</th>
            <th className="border p-4">Version</th>
            <th className="border p-4">Sex</th>
            <th className="border p-4">Email</th>
            <th className="border p-4">Update</th>
            <th className="border p-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id || index} className="text-center border">  
              <td className="border p-4">{index + 1}</td>
                <td className="border p-4">{student.studentId || "N/A"}</td>
              <td className="border p-4">{student.name}</td>
              <td className="border p-4">{student.class}</td>
              <td className="border p-4">{student.age}</td>
              <td className="border p-4">{student.version}</td>
              <td className="border p-4">{student.sex}</td>
              <td className="border p-4">{student.email}</td>
              <td className="border p-4">
                <button   onClick={() => navigate(`/update_student/`+student._id)} className="text-black px-2 py-1 rounded flex items-center gap-1">
                  <FaEdit />
                </button>
              </td>
              <td className="border p-4">
                <button onClick={() =>deleteStudent(student._id)} className="text-red-600 hover:bg-orange-200 px-2 py-1 rounded flex items-center gap-1">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default All_Students;
