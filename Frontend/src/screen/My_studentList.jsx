import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaEye } from "react-icons/fa";

Modal.setAppElement('#root');

const My_studentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `https://backend-just.onrender.com/api/oneclassteacher/attendancebyteacher/class/${userInfo?.classTeacher}`
        );

        // Sort by studentId numerically
        const sorted = res.data.sort((a, b) => {
          const idA = parseInt(a.studentId, 10);
          const idB = parseInt(b.studentId, 10);
          return idA - idB;
        });

        setStudents(sorted);
        setFilteredStudents(sorted);

      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    if (userInfo?.classTeacher) {
      fetchStudents();
    }
  }, []);

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="p-4">
      {/* Title */}
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-3xl font-serif font-semibold text-center">
          My Class's Students
        </h2>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border-gray-800">
        <thead>
          <tr className="bg-gray-300">
            <th className="border p-3">Student ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Class</th>
            <th className="border p-3">Age</th>
            <th className="border p-3">Sex</th>
            <th className="border p-3">Religion</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Details</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id} className="text-center border">
              <td className="border p-3">{student.studentId}</td>
              <td className="border p-3">{student.name}</td>
              <td className="border p-3">{student.class?.Class}</td>
              <td className="border p-3">{student.age}</td>
              <td className="border p-3">{student.sex}</td>
              <td className="border p-3">{student.religion}</td>
              <td className="border p-3">{student.email}</td>

              <td className="border p-3">
                <button
                  onClick={() => openModal(student)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEye className="inline-block" />
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
        className="bg-white rounded-md p-6 max-w-md mx-auto mt-24 shadow-xl border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center">
          Student Details
        </h3>

        {selectedStudent && (
          <div className="space-y-2 text-gray-700">
            <p><strong>Father's Name:</strong> {selectedStudent.fatherName}</p>
            <p><strong>Mother's Name:</strong> {selectedStudent.motherName}</p>
            <p><strong>Guardian Contact:</strong> {selectedStudent.gurdianContact}</p>
            <p><strong>Profession:</strong> {selectedStudent.gurdianProffesion}</p>
            <p><strong>Blood Group:</strong> {selectedStudent.bloodGroup}</p>
            <p><strong>Date of Birth:</strong> {selectedStudent.dob}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
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

export default My_studentList;
