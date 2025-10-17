import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const Update_Student = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    studentId: '',
    name: '',
    class: '',
    age: '',
    version: '',
    sex: '',
    email: '',
    fatherName: '',
    motherName: '',
    gurdianContact: '',
    gurdianProffesion: '',
    religion: '',
    caste: '',
    bloodGroup: '',
    dob: '',
    address: '',
  });

  const [classOptions, setClassOptions] = useState([]);
  
  useEffect(() => {

    axios.get("school-virid-iota.vercel.app/api/class/all_classInfo")
    .then((res) => setClassOptions(res.data))
    .catch((err) => console.error(err));


    axios.get(`school-virid-iota.vercel.app/api/student/${id}`)
      .then((response) => setStudent(response.data))
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
      await axios.put(`school-virid-iota.vercel.app/api/update/student/${id}`, student);
      toast.success("Student updated Successfully", { position: "top-right" });
      navigate("/student-list");
    } catch (error) {
      console.error(error);
      toast.error("Update failed!", { position: "top-right" });
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-indigo-50 shadow-md rounded-lg mt-10">
      {/* Back Button & Title */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/student-list')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 transition duration-300"
        >
          <FaArrowLeft className="text-lg" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-6 text-black drop-shadow-lg">
        UPDATE STUDENT
      </h2>

      {/* First Section Form */}
      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Student ID (Roll)</label>
          <input
            type="text"
            name="studentId"
            value={student.studentId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
            placeholder="Enter student roll number"
          />
        </div>

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

        <div>
          <label className="block font-medium">Class</label>
          <select
          name="class"
          value={student.class?._id || student.class}
          onChange={handleChange}
          required
          className='w-full border p-2 rounded-md border-blue-gray-500'>
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.Class}</option>
            ))}

          </select>

        </div>

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
      </form>

      {/* Second Header */}
      <h2 className="text-2xl font-semibold text-center my-6 text-black drop-shadow-lg">
        Update Gurdian & Other's Information
      </h2>

      {/* Second Section Form */}
      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <label className="block font-medium">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={student.fatherName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
            placeholder="Enter Name"
          />
        </div>

        <div>
          <label className="block font-medium">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={student.motherName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
            placeholder="Enter Name"
          />
        </div>

        <div>
          <label className="block font-medium">Gurdian's Contact</label>
          <input
            type="text"
            name="gurdianContact"
            value={student.gurdianContact}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
            placeholder="Enter Number"
          />
        </div>

        <div>
          <label className="block font-medium">Gurdian's Profession</label>
          <input
            type="text"
            name="gurdianProffesion"
            value={student.gurdianProffesion}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
            placeholder="Enter Profession"
          />
        </div>

        <div>
          <label className="block font-medium">Religion</label>
          <select
            name="religion"
            value={student.religion}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
          >
            <option value="">Select</option>
            <option value="Muslim">Muslim</option>
            <option value="Hindu">Hindu</option>
            <option value="Cristian">Cristian</option>
            <option value="Buddhist">Buddhist</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Caste</label>
          <input
            type="text"
            name="caste"
            value={student.caste}
            onChange={handleChange}
            className="w-full border p-2 rounded-md border-blue-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={student.bloodGroup}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md border-blue-gray-500"
          >
            <option value="">Select</option>
            <option value="A+">(A+)</option>
            <option value="A-">(A-)</option>
            <option value="B+">(B+)</option>
            <option value="B-">(B-)</option>
            <option value="O+">(O+)</option>
            <option value="O-">(O-)</option>
            <option value="AB+">(AB+)</option>
            <option value="AB-">(AB-)</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={student.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded-md border-blue-gray-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium">Address</label>
          <textarea
            name="address"
            value={student.address}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded-md border-blue-gray-500"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-between mt-4">
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800">
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate('/all_students')}
            className="bg-red-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update_Student;
