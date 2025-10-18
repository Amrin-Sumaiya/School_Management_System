import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Add_student = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    studentId: '',
    name: '',
    class: '', //object id
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
    isPresent: true,
  });
 
  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    // Fetch class options from the backend API
    const fetchClasses = async () => {
      try {
        const res = await axios.get("https://backend-just.onrender.com/api/class/all_classInfo");
        setClassOptions(res.data);
      } catch (error) {
        console.error("Error fetching class options:" , error);
      }
    };
    fetchClasses(); //call the api 
  }, []);


  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post('https://backend-just.onrender.com/api/students', student)
      .then((response) => {
        console.log('Student Add Successfully');
        toast.success(response.data.message, {
          position: 'top-right',
          className: 'text-gray-700 font-semibold',
        });
        navigate('/student-list');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='p-6  min-h-screen'>
      <h2 className='text-2xl font-semibold mb-6 text-center text-indigo-700'>
        Admit New Student
      </h2>

      <form
        onSubmit={submitForm}
        className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md'
      >
        {/* Section: Basic Student Info */}
        <div className='md:col-span-2 '>
          <button
            onClick={() => navigate('/student-list')}
            className='flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300'
          >
            <FaArrowLeft className='text-lg' />
            back
          </button>
          <br />{' '}
          <h3 className='text-xl font-semibold text-center bg-indigo-100 py-2 rounded'>
            Student Personal Information
          </h3>
        </div>

        <div>
          <label className='block font-medium'>Student ID</label>
          <input
            type='text'
            name='studentId'
            value={student.studentId}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div>
          <label className='block font-medium'>Name</label>
          <input
            type='text'
            name='name'
            value={student.name}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div>
          <label className='block font-medium'>Class</label>
          <select 
          name='class'
          value={student.class}
          onChange={handleChange}
          className='w-full border p-2 rounded-md'>
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
<option key={cls._id} value={cls._id}>
  {cls.Class}
</option>

            ))}

          </select>

        </div>

        <div>
          <label className='block font-medium'>Age</label>
          <input
            type='number'
            name='age'
            value={student.age}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div>
          <label className='block font-medium'>Sex</label>
          <select
            name='sex'
            value={student.sex}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          >
            <option value=''>Select</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>

        <div className='md:col-span-2'>
          <label className='block font-medium'>Email</label>
          <input
            type='email'
            name='email'
            value={student.email}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          />
        </div>

        {/* Section: Guardian Info */}
        <div className='md:col-span-2'>
          <h3 className='text-xl font-semibold text-center bg-indigo-100 py-2 rounded'>
            Guardian & Others Information
          </h3>
        </div>

        <div>
          <label className='block font-medium'>Father's Name</label>
          <input
            type='text'
            name='fatherName'
            value={student.fatherName}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div>
          <label className='block font-medium'>Mother's Name</label>
          <input
            type='text'
            name='motherName'
            value={student.motherName}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div>
          <label className='block font-medium'>Guardian Contact</label>
          <input
            type='text'
            name='gurdianContact'
            value={student.gurdianContact}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div>
          <label className='block font-medium'>Guardian Profession</label>
          <input
            type='text'
            name='gurdianProffesion'
            value={student.gurdianProffesion}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div>
          <label className='block font-medium'>Religion</label>
          <select
            name='religion'
            value={student.religion}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          >
            <option value=''>Select</option>
            <option value='Muslim'>Muslim</option>
            <option value='Hindu'>Hindu</option>
            <option value='Cristian'>Cristian</option>
            <option value='Buddhist'>Buddhist</option>
          </select>
        </div>

        <div>
          <label className='block font-medium'>Caste</label>
          <input
            type='text'
            name='caste'
            value={student.caste}
            onChange={handleChange}
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div>
          <label className='block font-medium'>Blood Group</label>
          <select
            name='bloodGroup'
            value={student.bloodGroup}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded-md'
          >
            <option value=''>Select</option>
            <option value='A+'>(A+)</option>
            <option value='A-'>(A-)</option>
            <option value='B+'>(B+)</option>
            <option value='B-'>(B-)</option>
            <option value='O+'>(O+)</option>
            <option value='O-'>(O-)</option>
            <option value='AB+'>(AB+)</option>
            <option value='AB-'>(AB-)</option>
          </select>
        </div>

        <div>
          <label className='block font-medium'>Date of Birth</label>
          <input
            type='date'
            name='dob'
            value={student.dob}
            onChange={handleChange}
            className='w-full border p-2 rounded-md'
          />
        </div>

        <div className='md:col-span-2'>
          <label className='block font-medium'>Address</label>
          <textarea
            name='address'
            value={student.address}
            onChange={handleChange}
            rows={3}
            className='w-full border p-2 rounded-md'
          />
        </div>

        {/* Submit/Reset */}
        <div className='md:col-span-2 flex justify-between mt-4'>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md'
          >
            Submit
          </button>
          <button
            type='button'
            onClick={() =>
              setStudent({
                studentId: '',
                name: '',
                class: '', //object id
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
              })
            }
            className='bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md'
          >
            Reset
          </button>
          <button
            type='button'
            onClick={() => navigate('/all_students')}
            className='bg-red-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_student;
