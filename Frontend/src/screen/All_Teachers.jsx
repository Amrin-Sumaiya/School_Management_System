import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


import axios from 'axios';

const All_Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);
      
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Fetch teacher data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/teachers/all_teachers");
        setTeachers(res.data);
      } catch (error) {
        console.log("Error fetching teachers:", error);
      }
    };
    fetchData();
  }, []);

 const deleteTeacher = async (teacherId) =>{
  await axios.delete(`http://localhost:8000/api/teachers/delete/teacher/${teacherId}`)
  .then((response)=>{
    setTeachers((prevTeacher)=>prevTeacher.filter((teacher) => teacher._id !==teacherId))
      toast.success(response.data.message,{position:"top-right"})
  })

  .catch((error)=>{
    console.log(error);
  })
 }



  return (
    <div className="p-4">
      {/* Title and Add Teacher Button */}
      <div className="relative mb-4">
        <h2 className="text-3xl font-semibold absolute left-1/2 transform -translate-x-1/2">
       Teacher’s Records
        </h2>
        <div className="flex justify-end">
          <button
            onClick={() => navigate('/add_teacher')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-800 transition"
          >
            <FaUserPlus />
            Add Teacher
          </button>
        </div>
      </div>

      {/* Table wrapper for horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-300">
              <th className="border p-4">SI</th>
              <th className="border p-4">Name</th>
              <th className="border p-4">Age</th>
              <th className="border p-4">Sex</th>
              <th className="border p-4">Assigned Subject</th>
              <th className="border p-4">Class Teacher Of</th>
              <th className="border p-4">Contact</th>
              <th className="border p-4">Email</th>
              <th className="border p-4">Join-Date</th>
              <th className="border p-4">Update</th>
              <th className="border p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher._id || index} className="text-center">
                <td className="border p-4">{index+1}</td>
                <td className="border p-4">{teacher.name}</td>
                <td className="border p-4">{teacher.age}</td>
                <td className="border p-4">{teacher.sex}</td>
                <td className="border p-4">
  {teacher.subjectCode?.subjectCode} ({teacher.subjectCode?.subjectName})
</td>

                <td className='border p-4'>{teacher.classTeacherOf || "N/A"}</td>
                <td className="border p-4">{teacher.contact}</td>
                <td className="border p-4">{teacher.email}</td>
                <td className="border p-4">{teacher.join_date}</td>
                <td className="border p-4">
                  <button onClick={() => navigate(`/update-teacher/` + teacher._id)}
                  className='text-blue-600 px-2 py-1 rounded flex items-center justify-center hover:scale-110 transition'

                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="border p-4">
                  <button onClick={()=>deleteTeacher(teacher._id)}
                    // Implement delete logic here
                    className="text-red-600 px-2 py-1 rounded flex items-center justify-center hover:scale-110 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default All_Teachers;
