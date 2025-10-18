import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Exam_Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [examData, setExamData] = useState({
    examDate: '',
    examName: '',
    examType: '',
    examMarks: '',
    classLevel: '',
    examRoomNumber: '',
  });

  const [classList, setClassList] = useState([]); //fetch all classlist
  useEffect(() => {
    axios 
    .get('https://backend-just.onrender.com/api/class/all_classInfo')
    .then((res) => setClassList(res.data))
    .catch((error) => console.error('Error fetching classes: '))
  }, []);

useEffect(() => {
    axios.get(`https://backend-just.onrender.com/api/exam/specific_exam_Info/${id}`)
        .then((response) => {
            const data = response.data;
            setExamData(prev => ({
                ...prev,
                ...data,
                examDate: data.examDate ? new Date(data.examDate).toISOString().split('T')[0] : prev.examDate,
                examName: data.examName ?? prev.examName,
                examType: data.examType ?? prev.examType,
                examMarks: data.examMarks ?? prev.examMarks,
                classLevel: data.classLevel ?? prev.classLevel,
                examRoomNumber: data.examRoomNumber ?? prev.examRoomNumber,
            }));
        })
        .catch((error) => {
            console.log(error);
        });
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
const submitForm = (e) => {
    e.preventDefault();

    const updatedData = {
        ...examData,
        examDate: new Date(examData.examDate).toISOString(), // safer unless confirmed YYYY-MM-DD is required
        examMarks: Number(examData.examMarks),
        classLevel: examData.classLevel,
    };

    try {
       axios.put(`https://backend-just.onrender.com/api/exam/update/${id}`, updatedData);
      toast.success("Exam updated Successfully", { position: "top-right" });
      navigate("/exam-list");
    } catch (error) {
      console.error(error);
      toast.error("Update failed!", { position: "top-right" });
    }
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-indigo-50 rounded-xl shadow-lg mt-10">
      <ToastContainer position="top-left" />


      <h2 className="text-2xl font-semibold text-center text-black mb-6">Update Exam Information</h2>

      <form onSubmit={submitForm} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div>
          <label className="block text-sm font-medium text-black">Exam Date</label>
          <input
            type="Date"
            name="examDate"
            value={examData.examDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
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


        {/* Column 2 */}
        <div>
          <label className="block text-sm font-medium text-black">Exam Type</label>
          <select
            name="examType"
            value={examData.examType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          >
            <option value="">Select Type</option>
            <option value="Written">Written</option>
            <option value="Oral">Oral</option>
            <option value="Practical">Practical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Exam Marks</label>
          <input
            type="number"
            name="examMarks"
            value={examData.examMarks}
            onChange={handleChange}
            placeholder="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Class Level</label>
          <select
            name="classLevel"
            value={examData.classLevel}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          >
            <option value="">Select Class</option>
            {classList.map((cls) => (
              <option key={cls._id} value={cls.Class}>
                {cls.Class}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Room Number</label>
          <input
            type="text"
            name="examRoomNumber"
            value={examData.examRoomNumber}
            onChange={handleChange}
            placeholder="601(A)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        {/* Buttons (spans 2 columns) */}
        <div className="md:col-span-2 flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-blue-400 text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate('/exam-list')}
            className="w-full bg-red-300 hover:bg-red-500 text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Exam_Update;
