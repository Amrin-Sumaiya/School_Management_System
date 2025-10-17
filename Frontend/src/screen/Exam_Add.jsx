import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_Exam = () => {
  const exams = {
    examDate: '',
    examName: '',
    examType: '',
    examMarks: '',
    classLevel: '',
    examRoomNumber: '',
  };
  const [examData, setExamData] = useState(exams);

  const [classList, setClassList] = useState([]); //fetch class ist from class model
  useEffect(() => {
    axios
    .get('school-virid-iota.vercel.app/api/class/all_classInfo')
    .then((res) => setClassList(res.data))
    .catch((error) => console.error('Error fetching classes: ', error));

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setExamData({ ...examData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post('school-virid-iota.vercel.app/api/exam/exams', examData)
      .then((response) => {
        toast.success('Exam information uploaded successfully');
        setTimeout(() => {
          navigate('/exam_info');
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to upload successfully');
      });
  };

  const navigate = useNavigate();

  return (
    <div className='max-w-4xl mx-auto bg-indigo-50 p-6 rounded-md shadow-md '>
      <ToastContainer position='top-right' />
            {/* Back Button */}
            <div className="mb-4">
              <button
                onClick={() => navigate('/exam-list')}
                className='flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300'
              >   <FaArrowLeft className='text-lg' />
                Back
              </button>
              </div>

      <h2 className='py-3 text-3xl font-bold text-center text-indigo-900 mb-6 '>
        Add Exam Information
      </h2>
      <form
        onSubmit={submitForm}
        className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:p-10'
      >
        <div>
          <label className='block text-sm font-sans text-black'>
            Exam Date
          </label>
          <input    
            type='date'
            name='examDate'
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
            required
          />
        </div>

<div>
  <label className='block text-sm font-medium text-black'>
    Exam Name
  </label>
  <select
    name='examName'
    onChange={handleChange}
    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
    required
  >
    <option value=''>Select Exam</option>
    <option value='1st Term'>1st Term</option>
    <option value='2nd Term'>2nd Term</option>
    <option value='3rd Term'>3rd Term</option>
  </select>
</div>


        <div>
          <label className='block text-sm font-medium text-black'>
            Exam Type
          </label>
          <select
            name='examType'
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
            required
          >
            <option value=''>Select Type</option>
            <option value='Written'>Written</option>
            <option value='Oral'>Oral</option>
            <option value='Practical'>Practical</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-black'>
            Exam Marks
          </label>
          <input
            type='number'
            name='examMarks'
            onChange={handleChange}
            placeholder='100'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-black'>
            Class Level
          </label>
<select name='classLevel' onChange={handleChange} value={examData.classLevel}
className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2' required>
  <option value=''>Select Class</option>
  {classList.map((cls) => (
    <option key={cls._id} value={cls.Class}>
      {cls.Class}
    </option>
  ))}

</select>
        </div>

        <div>
          <label className='block text-sm font-medium text-black'>
            Room Number
          </label>
          <input
            type='text'
            name='examRoomNumber'
            onChange={handleChange}
            placeholder='Room No'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
            required
          />
        </div>

        <div className='md:col-span-2 flex justify-between space-x-4 mt-2'>
          <button
            type='submit'
            className='w-full bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md transition duration-200'
          >
            Submit
          </button>
          <button
            type='button'
            onClick={() => window.history.back()}
            className='w-full bg-red-300 hover:bg-red-500 text-white font-semibold py-2 rounded-md shadow-md transition duration-200'
          > 
            Cancel 
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_Exam;
