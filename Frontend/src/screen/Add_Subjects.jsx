import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_Subjects = () => {
  const subjects = {
    subjectCode: '',
    subjectName: '',
    description: ''
  };

  const [course, setCourse] = useState(subjects);
  const navigate = useNavigate(); // ✅ Move navigate here

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://backend-just.onrender.com/api/subject/subjects',
        course
      );
      toast.success('Subject created successfully', {
        position: 'top-right',
        autoClose: 2000,
        onClose: () => navigate('/subject-list') // ✅ Correct usage
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to create subject', {
        position: 'top-right',
        autoClose: 2000
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-indigo-50 rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">
          Add New Subject
        </h2>
        <button
          onClick={() => navigate('/subject-list')}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition mb-4"
        >
          <FaArrowLeft /> back
        </button>

        {/* Toast container */}
        <ToastContainer />

        <form className="space-y-5" onSubmit={submitForm}>
          <div>
            <label
              className="block text-gray-900 font-medium mb-1"
              htmlFor="subjectCode"
            >
              Subject Code
            </label>
            <input
              type="text"
              id="subjectCode"
              onChange={inputHandler}
              name="subjectCode"
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="e.g. ENG-101"
            />
          </div>

          <div>
            <label
              className="block text-gray-900 font-medium mb-1"
              htmlFor="subjectName"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              onChange={inputHandler}
              name="subjectName"
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="e.g. English Literature"
            />
          </div>

          <div>
            <label
              className="block text-gray-900 font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              onChange={inputHandler}
              name="description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Brief subject details..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Submit Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Subjects;
