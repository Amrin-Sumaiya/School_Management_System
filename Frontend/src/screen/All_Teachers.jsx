import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaEye } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const All_Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Show toast when redirected after successful action
  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // ✅ Fetch teacher data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('school-virid-iota.vercel.app/api/teachers/all_teachers');
        setTeachers(res.data);
      } catch (error) {
        console.log('Error fetching teachers:', error);
      }
    };
    fetchData();
  }, []);

  // ✅ Delete teacher
  const deleteTeacher = async (teacherId) => {
    try {
      const response = await axios.delete(
        `school-virid-iota.vercel.app/api/teachers/delete/teacher/${teacherId}`
      );
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== teacherId)
      );
      toast.success(response.data.message, { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast.error('Failed to delete teacher');
    }
  };

  // ✅ Modal handlers
  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    setIsModalOpen(false);
  };

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

      {/* Table wrapper */}
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
              <th className="border p-4">View Details</th>
              <th className="border p-4">Join-Date</th>
              <th className="border p-4">Update</th>
              <th className="border p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher._id || index} className="text-center">
                <td className="border p-4">{index + 1}</td>
                <td className="border p-4">{teacher.name}</td>
                <td className="border p-4">{teacher.age}</td>
                <td className="border p-4">{teacher.sex}</td>

                <td className="border p-4">
                  {teacher.subjects && teacher.subjects.length > 0 ? (
                    teacher.subjects.map((sub, idx) => (
                      <span key={sub._id || idx} className="block">
                        {sub.subjectCode} ({sub.subjectName})
                      </span>
                    ))
                  ) : (
                    'N/A'
                  )}
                </td>

                <td className="border p-4">
                  {teacher.classTeacherOf?.Class || 'N/A'}
                </td>
                <td className="border p-4">{teacher.contact}</td>
                <td className="border p-4">{teacher.email}</td>

                <td className="border p-4">
                  <button
                    onClick={() => openModal(teacher)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye className="inline-block mr-1" />
                  </button>
                </td>

                <td className="border p-4">{teacher.join_date}</td>

                <td className="border p-4">
                  <button
                    onClick={() => navigate(`/update-teacher/${teacher._id}`)}
                    className="text-blue-600 px-2 py-1 rounded flex items-center justify-center hover:scale-110 transition"
                  >
                    <FaEdit />
                  </button>
                </td>

                <td className="border p-4">
                  <button
                    onClick={() => deleteTeacher(teacher._id)}
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

      {/* ✅ Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Teacher Details"
        className="bg-white rounded-md p-6 max-w-md mx-auto mt-24 shadow-xl border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center">
          Teacher Details
        </h3>
        {selectedTeacher && (
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {selectedTeacher.name}</p>
            <p><strong>University:</strong> {selectedTeacher.university || 'N/A'}</p>
            <p><strong>Passing Year:</strong> {selectedTeacher.passingYear || 'N/A'}</p>
            <p><strong>Department:</strong> {selectedTeacher.department || 'N/A'}</p>
            <p><strong>Experience:</strong> {selectedTeacher.experience || 'N/A'}</p>
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

export default All_Teachers;
