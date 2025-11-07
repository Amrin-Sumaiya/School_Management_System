import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_Exam = () => {
  const exams = {
    examDate: '',
    examType: '',
    examMarks: '',
  };

    const [examData, setExamData] = useState(exams);
    const navigate = useNavigate();

    //exam marks bindings 
    const marksMapping = {
      "Class Test (CT)" : 10,
      "Half Yearly" : 30,
      "Yearly" : 50,
      "Pre-Test" : 100,
      "Test" : 100,
    }

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    //if examType changes, auto-set marks
    if (name === 'examType'){
      setExamData({
        ...examData,
        examType: value,
        examMarks: marksMapping[value] || '',
      })
    }

    //prevent manual typing makrs
    else if (name === "examMarks"){
      toast.error("You cannot change exam marks manually.");
    } else {
      setExamData({ ...examData, [name]: value});
    }

  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
         await axios
      .post('https://backend-just.onrender.com/api/exam/exams', examData)
      toast.success('Exam information uploaded successfully!');
      setTimeout(() => navigate("/exam-list"), 2000);
    } catch (error) {
      toast.error("Failed to upload exam information");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <ToastContainer position="top-right" />
      
      <div className="w-full max-w-3xl bg-gradient-to-r from-indigo-100 to-blue-50 rounded-2xl shadow-2xl p-8 md:p-12">
        
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/exam-list')}
            className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
          >
            <FaArrowLeft />
            Back to Exam List
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          Add Exam Information
        </h2>

        <form
          onSubmit={submitForm}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Exam Date */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={examData.examDate}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Exam Type */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Exam Type</label>
            <select
              name="examType"
              value={examData.examType}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
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

          {/* Exam Marks */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Exam Marks</label>
            <input
              type="number"
              name="examMarks"
              value={examData.examMarks}
              onChange={handleChange}
              readOnly
              className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
              required
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 bg-red-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg shadow-md transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Exam;
