import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Update_Teacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: '',
    age: '',
    sex: '',
    department: '',
    contact: '',
    email: '',
    join_date: '',
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/teachers/teacher/${id}`);
        setTeacher(res.data);
      } catch (error) {
        toast.error('Failed to fetch teacher data');
        console.error(error);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleOnChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/teachers/update/teacher/${id}`, teacher);
      navigate('/all_teachers', { state: { successMessage: 'Teacher updated successfully!' } });
    } catch (error) {
      console.error('Error updating teacher:', error);
      toast.error('Failed to update teacher');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-400 shadow-md rounded-lg">
      <button
        onClick={() => navigate('/all_teachers')}
        className="flex items-center gap-2 text-white bg-gray-700 hover:bg-blue-800 px-4 py-2 rounded-md font-semibold transition mb-4"
      >
        <FaArrowLeft /> Back
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Update Teacher</h2>

      <form onSubmit={handleOnSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={teacher.name}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={teacher.age}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Sex */}
        <div>
          <label className="block font-medium">Sex</label>
          <select
            name="sex"
            value={teacher.sex}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={teacher.department}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block font-medium">Contact</label>
          <input
            type="text"
            name="contact"
            value={teacher.contact}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={teacher.email}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Join Date */}
        <div className="md:col-span-2">
          <label className="block font-medium">Join Date</label>
          <input
            type="date"
            name="join_date"
            value={teacher.join_date?.length >= 10 ? teacher.join_date.slice(0, 10) : ''}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate('/all_teachers')}
            className="bg-red-800 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update_Teacher;
