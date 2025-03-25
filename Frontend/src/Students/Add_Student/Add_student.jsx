import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";  // Import Back Icon
import axios from 'axios';

const Add_Student = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [student, setStudent] = useState({
    name: '',
    class: '',
    age: '',
    version: '',
    sex: '',
    email: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };



  const submitForm = async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:8000/api/students", student)
    .then((response)=>{
        console.log("Student Add Successfully")
        navigate("/all_students")
    })
    .catch((error)=>{
        console.log(error)

    })
  }

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

      <h2 className="text-2xl font-semibold text-center mb-6 text-black drop-shadow-lg">ADD NEW STUDENT</h2>

      <form onSubmit={submitForm} className="space-y-4">
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
          <label className="block font-medium border-blue-gray-500">Version</label>
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
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
            Submit
          </button>
          <button 
            type="reset" 
            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500"
            onClick={() => setStudent({ name: '', class: '', age: '', version: '', sex: '', email: '' })}
          >
            Reset
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

export default Add_Student;
