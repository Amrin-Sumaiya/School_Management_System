import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add_Teacher = () => {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: '',
    email: '',
    department: '',
    sex: '',
    join_date: '',
    age: '',
    contact: '',
  });

  const handleOnChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/teachers/teacher", teacher);
      navigate('/all_teachers', {
        state: { successMessage: 'Teacher added successfully!' }
      });
    } catch (error) {
      console.error('Error adding teacher: ', error);
      toast.error('Failed to add teacher');
    }
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 bg-blue-gray-100 shadow-md rounded-lg'>
      {/* Back Button */}
      <button
        onClick={() => navigate('/all_teachers')}
        className='flex items-center gap-2 text-white bg-gray-800 hover:bg-blue-800 px-4 py-2 rounded-md font-semibold transition mb-4'
      >
        <FaArrowLeft className="text-white" />
        Back
      </button>

      {/* Title */}
      <h2 className='text-2xl font-bold text-center mb-6'>ADD NEW TEACHER</h2>

      {/* Form */}
      <form onSubmit={handleOnSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        {/* Name */}
        <div>
          <label className='block font-medium'>Full Name</label>
          <input
            type="text"
            name="name"
            value={teacher.name}
            onChange={handleOnChange}
            placeholder="Enter full name"
            className='w-full border p-2 rounded-md border-blue-gray-500'
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className='block font-medium'>Age</label>
          <input
            type="number"
            name="age"
            value={teacher.age}
            onChange={handleOnChange}
            placeholder="Enter age"
            className='w-full border p-2 rounded-md border-blue-gray-500'
            required
          />
        </div>

        {/* Sex */}
        <div>
          <label className='block font-medium'>Sex</label>
          <select
            name="sex"
            value={teacher.sex}
            onChange={handleOnChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label className='block font-medium'>Department</label>
          <input
            type="text"
            name="department"
            value={teacher.department}
            onChange={handleOnChange}
            placeholder="Enter department"
            className='w-full border p-2 rounded-md border-blue-gray-500'
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className='block font-medium'>Contact</label>
          <input
            type="text"
            name="contact"
            value={teacher.contact}
            onChange={handleOnChange}
            placeholder="Enter phone number"
            className='w-full border p-2 rounded-md border-blue-gray-500'
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className='block font-medium'>Email</label>
          <input
            type="email"
            name="email"
            value={teacher.email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className='w-full border p-2 rounded-md border-blue-gray-500'
            required
          />
        </div>

        {/* Join Date - Full width */}
        <div className='md:col-span-2'>
          <label className='block font-medium'>Join Date</label>
          <input
            type="date"
            name="join_date"
            value={teacher.join_date}
            onChange={handleOnChange}
            className='w-full border p-2 rounded-md border-blue-gray-500'
            required
          />
        </div>

        {/* Buttons */}
        <div className='md:col-span-2 flex justify-between mt-4'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-semibold transition'>
            Submit
          </button>

          <button
            type='reset'
            onClick={() => setTeacher({
              name: '',
              email: '',
              department: '',
              sex: '',
              join_date: '',
              age: '',
              contact: '',
            })}
            className='bg-gray-600 hover:bg-purple-900 text-white px-6 py-2 rounded-md font-semibold transition'
          >
            Reset
          </button>

          <button
            type='button'
            onClick={() => navigate('/all_teachers')}
            className='bg-red-900 hover:bg-blue-gray-500 text-white px-6 py-2 rounded-md font-semibold transition'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_Teacher;
