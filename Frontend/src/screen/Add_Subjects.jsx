import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { toast} from 'react-toastify'

const Add_Subjects = () => {

const subjects = {
  subjectCode: '',
  subjectName: '',
  description: ''
};


    const [ course, setCourse ] = useState(subjects)

    const inputHandler = (e) =>{
        const { name, value }= e.target;
        console.log(name, value)

        setCourse({ ...course, [name]: value });

    }

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.post("https://backend-just.onrender.com/api/subject/subjects", course)
        .then((response)=>{
            toast.success("Subject created successfully ")
            navigate("/subjects")
        }, 1000)
        .catch((error)=>{
            console.log(error);
            toast.error("Failed to create subject")
        })
    }
    const navigate = useNavigate()


  return (
        <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-indigo-50 rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6 text-black">
        Add New Subject
      </h2>
      <button onClick={() => navigate('/subject-list')} className='flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition mb-4'>
        <FaArrowLeft /> back</button>

      <form className="space-y-5" onSubmit={submitForm}>
        {/* Subject Code */}
        <div>
          <label className="block text-gray-900 font-medium mb-1" htmlFor="subjectCode">
            Subject Code
          </label>
          <input
            type="text"
            id="subjectCode"
            onChange={inputHandler}
            name="subjectCode"
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="e.g. ENG-101"
          />
        </div>

        {/* Subject Name */}
        <div>
          <label className="block text-gray-900 font-medium mb-1" htmlFor="subjectName">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            onChange={inputHandler}
            name="subjectName"
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="e.g. English Literature"
          />
        </div>



        {/* Description */}
        <div>
          <label className="block text-gray-900 font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            onChange={inputHandler}
            name="description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Brief subject details..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button onClick={()=> navigate('/subject-list' )}
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Submit Subject
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Add_Subjects
