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
   subjects: '',
   classTeacherOf: '',
   contact: '',
    email: '',
    join_date: '',
     university : '', 
    passingYear: '',
    department: '',
    experience: '',
  });


  //store all subjects in state 
 const [subjects, setSubjects] = useState([]);
 const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/teachers/teacher/${id}`);
setTeacher({
  ...res.data,
  subjects: res.data.subjects?.map((sub) => sub._id) || []
});

      } catch (error) {
        toast.error('Failed to fetch teacher data');
        console.error(error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/subject/all_subjects`);
        setSubjects(res.data);
      } catch (error) {
        toast.error('Failed to fetch subjects');
        console.error(error);
      }
    };

    const fetchClasses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/class/all_classInfo");
        setClasses(res.data);
      } catch (error) {
        toast.error("Failed to fetch classes");
        console.error(error);
      }
    };

    fetchClasses();
    fetchSubjects();
    fetchTeacher();
  }, [id]);

  const handleOnChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/teachers/update/teacher/${id}`, teacher);
      toast.success("Teacher updated Successfully", { position: "top-right" });
      navigate('/all-teacher-list');
    } catch (error) {
      console.error('Error updating teacher:', error);
      toast.error('Failed to update teacher');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-indigo-50 shadow-md rounded-lg">
      <button
        onClick={() => navigate('/all-teacher-list')}
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

        {/* Assign Subjects */}
<div>
  <label className="block font-medium">Assigned Subjects</label>
  <select
    name="subjects"
    multiple
    value={teacher.subjects || []}
    onChange={(e) =>
      setTeacher({
        ...teacher,
        subjects: Array.from(e.target.selectedOptions, (opt) => opt.value),
      })
    }
    className="w-full border p-2 rounded-md"
    required
  >
    {subjects.map((sub) => (
      <option key={sub._id} value={sub._id}>
        {sub.subjectCode} - {sub.subjectName}
      </option>
    ))}
  </select>
  
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




        {/* Class Teacher Of (Optional) */}
<div>
  <label className="block font-medium">Class Teacher Of</label>
<select 
name="classTeacherOf"
value={teacher.classTeacherOf}
onChange={handleOnChange}
className="w-full border p-2 rounded-md">
  <option value="">Select Class (optional)</option>
  {classes.map((cls) => (
<option key={cls._id} value={cls._id}>
  {cls.Class}
</option> 
  ))}

</select>
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
        <div >
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
                {/* University */}
        <div>
          <label className='block font-medium mb-1 '>Degree Form</label>
            <input
            type='text'
            name= 'university'
            value={ teacher.university}
            onChange={handleOnChange}  
            placeholder='Enter University name'
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'     
            >
            </input>
        </div>
        {/* Department name */}
        <div>
          <label className='block font-medium mb-1'>Department of Education</label>
          <input
          type='text'
          name='department'
          value={ teacher.department}
          onChange={handleOnChange}
          placeholder='Enter Department name'
          className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'>
          </input>
        </div>
        {/* Passing Year */}
        <div>
          <label className='block font-medium mb-1'>Passing Year</label>
          <input type='text'
          name='passingYear'
          value={ teacher.passingYear}
          onChange={handleOnChange}
          placeholder='Enter passing year'
          className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'>
          </input>
        </div>
         {/* Experience */}
        <div>
          <label className='block font-medium mb-1'>Teaching Experience</label>
          <input type='text'
          name='experience'
          value={ teacher.experience}
          onChange={handleOnChange}
          placeholder='Enter Experience in years'
          className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'>
          </input>
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
            onClick={() => navigate('/all-teacher-list')}
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
