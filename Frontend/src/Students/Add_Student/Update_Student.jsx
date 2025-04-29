import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const Update_Student = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    class: '',
    age: '',
    version: '',
    sex: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api//student/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch student data", { position: "top-right" });
      });
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/update/student/${id}`, student);
      toast.success("Student updated successfully!", { position: "top-right" });
      navigate("/all_students");
    } catch (error) {
      console.error(error);
      toast.error("Update failed!", { position: "top-right" });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-blue-gray-200 shadow-md rounded-lg mt-10">
      {/* Back Button & Title */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/all_students')} 
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 transition duration-300"
        >
          <FaArrowLeft className="text-lg" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-6 text-black drop-shadow-lg">UPDATE STUDENT</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
            placeholder="Enter full name"
          />
        </div>

        {/* Class */}
        <div>
          <label className="block font-medium">Class</label>
          <input
            type="text"
            name="class"
            value={student.class}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
            placeholder="Enter class"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
            className="w-full border border-blue-gray-500 p-2 rounded-md"
            placeholder="Enter age"
          />
        </div>

        {/* Version */}
        <div>
          <label className="block font-medium">Version</label>
          <select
            name="version"
            value={student.version}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
          >
            <option value="">Select Version</option>
            <option value="Bangla">Bangla</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium">Gender</label>
          <select
            name="sex"
            value={student.sex}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
            placeholder="Enter email"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800">
            Update
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/all_students')} 
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update_Student;
