import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const Add_Teacher = () => {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: '',
    email: '',
    subjectCode: '',
    classTeacherOf: '',
    sex: '',
    join_date: '',
    age: '',
    contact: '',
  });

  //store all subject data in state
  const [subjects, setSubjects] = useState([]);

  //fetch all subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/subject/all_subjects');
        setSubjects(res.data); //api returs an array of all subjects
      } catch (error) {
        console.error('Error fethching subjects:' , error);
        toast.error('Failed to fetch subjects'); 
      }
    };
    fetchSubjects();
  }, []);

  const handleOnChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/teachers/teacher', teacher);
      navigate('/all-teacher-list', {
        state: { successMessage: 'Teacher added successfully!' },
      });
    } catch (error) {
      console.error('Error adding teacher: ', error);
      toast.error('Failed to add teacher');
    }
  };

  return (
    <div className='max-w-4xl mx-auto bg-indigo-50 p-6 rounded-md shadow-md'>
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate('/all-teacher-list')}
          className='flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300'
        >   <FaArrowLeft className='text-lg' />
          Back
        </button>
      </div>

      {/* Title */}
      <h2 className='text-2xl font-bold text-center mb-6 text-indigo-900'>
        ADD NEW TEACHER
      </h2>

      {/* Form */}
      <form
        onSubmit={handleOnSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {/* Name */}
        <div>
          <label className='block font-medium mb-1'>Full Name</label>
          <input
            type='text'
            name='name'
            value={teacher.name}
            onChange={handleOnChange}
            placeholder='Enter full name'
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className='block font-medium mb-1'>Age</label>
          <input
            type='number'
            name='age'
            value={teacher.age}
            onChange={handleOnChange}
            placeholder='Enter age'
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            required
          />
        </div>

        {/* Sex */}
        <div>
          <label className='block font-medium mb-1'>Sex</label>
          <select
            name='sex'
            value={teacher.sex}
            onChange={handleOnChange}
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            required
          >
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        {/* class teacher of */}
        <div>
          <label className="'block font-medium mb-1">Class Teacher</label>
          <input 
            type='text'
            name='classTeacherOf'
            value={teacher.classTeacherOf}
            onChange={handleOnChange}
            placeholder='Enter class (optional)'
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
             />
        </div>

        {/* Assign Subject*/}
        <div>
          <label className='block font-medium mb-1'>Assigned Subject</label>
          <select     
            name='subjectCode'
            value={teacher.subjectCode}
            onChange={handleOnChange} 
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            required >

            <option value=''>Select Subject</option>
            {subjects.map((sub) =>(
              <option key={sub._id} value={sub.subjectCode}>
                {sub.subjectCode} - {sub.subjectName}
        
              </option>
            ))} 
      
            </select>
          
        </div>

        {/* Contact */}
        <div>
          <label className='block font-medium mb-1'>Contact</label>
          <input
            type='text'
            name='contact'
            value={teacher.contact}
            onChange={handleOnChange}
            placeholder='Enter phone number'
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className='block font-medium mb-1'>Email</label>
          <input
            type='email'
            name='email'
            value={teacher.email}
            onChange={handleOnChange}
            placeholder='Enter email address'
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            required
          />
        </div>

        {/* Join Date */}
        <div className='md:col-span-2'>
          <label className='block font-medium mb-1'>Join Date</label>
          <input
            type='date'
            name='join_date'
            value={teacher.join_date}
            onChange={handleOnChange}
            className='w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
            required
          />
        </div>

        {/* Buttons */}
        <div className='md:col-span-2 flex flex-wrap justify-between gap-4 mt-4'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-semibold transition'
          >
            Submit
          </button>

          <button
            type='reset'
            onClick={() =>
              setTeacher({
                name: '',
                email: '',
                department: '',
                sex: '',
                join_date: '',
                age: '',
                contact: '',
              })
            }
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
