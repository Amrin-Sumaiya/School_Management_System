import axios from 'axios';
import { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setExamData({ ...examData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:8000/api/exam/exams', examData)
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
    <div className='mx-auto '>
      <ToastContainer position='top-right' />

      <h2 className='py-3 text-2xl font-semibold text-center text-black mb-6 '>
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
          <input
            type='text'
            name='examName'
            onChange={handleChange}
            placeholder='Half-yearly / Final'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
            required
          />
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
          <input
            type='text'
            name='classLevel'
            onChange={handleChange}
            placeholder='8'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-black'>
            Room Number
          </label>
          <input
            type='text'
            name='examRoomNumber'
            onChange={handleChange}
            placeholder='601(A)'
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
