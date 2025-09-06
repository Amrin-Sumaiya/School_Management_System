import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const All_Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/student");
          // Sort class numerically
      const sortedByClass = response.data.sort((a, b) => {
        const classA = parseInt(a.class);
        const classB = parseInt(b.class);
        return classA - classB;
      });

      setStudents(sortedByClass);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const deleteStudent = async (studentId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/student/${studentId}`);
      setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log("Error deleting student: ", error);
      toast.error("Failed to delete student");
    }
  };

  console.log(" userInfo?.role=.",userInfo);
  
  return (
    <div className="p-4">
      {/* Title and Add Student Button */}
      {
        userInfo?.role=='SuperAdmin' ?   <div className="flex items-center justify-between mb-4 relative ">
        <div className="flex-1" /> 
        <h2 className="text-3xl font-semibold absolute left-1/2 transform -translate-x-1/2">
          Student’s Records
        </h2>
        <button 
          onClick={() => navigate('/add_student')} 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          <FaUserPlus />
          Add Student
        </button>
      </div> : ''
      }
    

      {/* Table */}
      <table className='w-full border-collapse border-gray-800'>
        <thead>
          <tr className='bg-gray-300'>
            <th className="border p-2">Class</th>
            <th className="border p-4">Name</th>
            <th className="border p-4">ID</th>
            <th className="border p-4">Age</th>
            <th className="border p-4">Sex</th>
            <th className="border p-4">Religion</th>
            <th className="border p-4">Email</th>
            <th className="border p-4">View Details</th>
            <th className="border p-2">Update</th>
            <th className="border p-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr key={student?._id} className="text-center border">
             
              <td className="border p-4">{student?.class?.Class}</td>
              <td className="border p-4">{student?.name}</td>
               <td className="border p-2">{student?.studentId || "N/A"}</td>
              <td className="border p-4">{student?.age}</td>
              <td className="border p-4">{student?.sex}</td>
              <td className="border p-4">{student?.religion}</td>
              <td className="border p-4">{student?.email}</td>
              <td className="border p-4">
                <button onClick={() => openModal(student)} className="text-blue-600 hover:text-blue-800">
                  <FaEye className="inline-block mr-1" />
                </button>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => navigate(`/update_student/` + student._id)}
                  className="text-blue-600 hover:bg-green-200 px-2 py-1 rounded flex items-center gap-1"
                >
                  <FaEdit />
                </button>
              </td>
              <td className="border p-4">
                <button
                  onClick={() => deleteStudent(student._id)}
                  className="text-red-600 hover:bg-orange-200 px-2 py-1 rounded flex items-center gap-1"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Guardian and Others Information"
        className="bg-white rounded-md p-6 max-w-md mx-auto mt-24 shadow-xl border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center">Guardian & Others Details</h3>
        {selectedStudent && (
          <div className="space-y-2 text-gray-700">
            <p><strong>Father's Name:</strong> {selectedStudent.fatherName}</p>
            <p><strong>Mother's Name:</strong> {selectedStudent.motherName}</p>
            <p><strong>Guardian Profession:</strong> {selectedStudent.gurdianProffesion}</p>
            <p><strong>Guardian Contact:</strong> {selectedStudent.gurdianContact}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>Blood Group:</strong> {selectedStudent.bloodGroup}</p>
            <p><strong>Bith-Date:</strong> {selectedStudent.dob}</p>
            <p><strong>Caste:</strong> {selectedStudent.caste}</p>
            
          </div>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={closeModal}
            className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default All_Students;
