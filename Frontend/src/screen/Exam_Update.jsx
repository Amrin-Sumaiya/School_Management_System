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
    examType: '',
    examMarks: '',
  });


  const marksMapping = {
      "Class Test (CT)" : 10,
      "Half Yearly" : 30,
      "Yearly" : 50,
      "Pre-Test" : 100,
      "Test" : 100,
  }


useEffect(() => {
    axios.get(`https://backend-just.onrender.com/api/exam/specific_exam_Info/${id}`)
        .then((res) => {
            const data = res.data;
            setExamData(prev => ({
                ...prev,
                ...data,
                examDate: data.examDate ? new Date(data.examDate).toISOString().split('T')[0] : "",
                examType: data.examType || "",
                examMarks: data.examMarks || "",
            }));
        })
        .catch((error) => {
            console.log(error);
        });
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "examType"){
      setExamData({
        ...examData,
        examType: value,
        examMarks: marksMapping[value] || "",
      });
    }

    // prevent manual typing marks
    else if (name === "examMarks"){
      toast.error("You cannot change exam marks manually.", { position: "top-right" });
    } else {
      setExamData({ ...examData, [name]: value });
    }

  };

  // Handle form submission
const submitForm = async (e) => {
    e.preventDefault();

    const updatedData = {
        ...examData,
        examDate: new Date(examData.examDate).toISOString(),
        examMarks: Number(examData.examMarks),
    };

    try {
        await axios.put(`https://backend-just.onrender.com/api/exam/update/${id}`, updatedData);
        toast.success("Exam updated Successfully");
        setTimeout(() => navigate("/exam-list"), 2000);
    } catch (error) {
        console.error(error);
        toast.error("Update failed!");
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
              <option value="">Select Exam Type</option>
              <option value="Class Test (CT)">Class Test (CT)</option>
              <option value="Half Yearly">Half Yearly</option>
              <option value="Yearly">Yearly</option>
              <option value="Pre-Test">Pre-Test</option>
              <option value="Test">Test</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black">Exam Marks</label>
          <input
            type="number"
            name="examMarks"
            value={examData.examMarks}
            onChange={handleChange}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-100 cursor-not-allowed"
            
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
