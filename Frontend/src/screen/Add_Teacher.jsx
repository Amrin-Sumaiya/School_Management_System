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
    subjects: '',
    classTeacherOf: '',
    sex: '',
    join_date: '',
    age: '',
    contact: '',
    university : '', 
    passingYear: '',
    department: '',
    experience: '',
  });

  //store all subject data in state
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  //fetch all subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('https://backend-just.onrender.com/api/subject/all_subjects');
        setSubjects(res.data); //api returs an array of all subjects
      } catch (error) {
        console.error('Error fethching subjects:' , error);
        toast.error('Failed to fetch subjects'); 
      }
    };

    const fetchClasses = async () => {
      try {
        const res = await axios.get("https://backend-just.onrender.com/api/class/all_classInfo");
        setClasses(res.data);
      } catch (error) {
        console.error("Error fetching classes: ", error);
        toast.error("Failed to fetch classes");
      }
    }

    fetchSubjects();
    fetchClasses();
  }, []);

  const handleOnChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-just.onrender.com/api/teachers/teacher', teacher);
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
<select 
name="classTeacherOf"
value={teacher.classTeacherOf}
onChange={handleOnChange}
className="w-full border p-2 rounded-md border-blue-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">
  <option value="">Select Class (optional)</option>
  {classes.map((cls) => (
<option key={cls._id} value={cls._id}>
  {cls.Class}
</option> 
  ))}

</select>
        </div>

{/* Assign Subjects */}
<div>
  <label className='block font-medium mb-1'>Assigned Subjects</label>
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
  <small className="text-gray-500">Hold CTRL (Windows) or CMD (Mac) to select multiple</small>
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
        <div >
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

        {/* University */}
        <div>
          <label className='block font-medium mb-1'>Degree Form</label>
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
                subjectCode: '',
                classTeacherOf: '',
                sex: '',
                join_date: '',
                age: '',
                contact: '',
    university : '', 
    passingYear: '',
    department: '',
    experience: '',
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
