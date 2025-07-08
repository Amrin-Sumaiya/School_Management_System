import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import axios from 'axios'


const ExamManage = () => {
    const [ exams, setExams] = useState( [] )
    useEffect( () =>{
        const fetchData = async()=>{
            try {
             const response =   await axios.get("http://localhost:8000/api/exam/all_exams");
             setExams(response.data) 
            } catch (error){
                console.log("Error while fetching data", error)
            }
        };
        fetchData()
    }, [])
    const navigate = useNavigate()
  return (
    <div className='p-4'>
     <div className='bg-orange-50 shadow-lg rounded-xl p-6'>
    <div className='mb-4 flex justify-between items-center'>
   <h2 className='text-3xl font-semibold text-black text-center w-full'>Exam Management Directory</h2>
<button onClick={() => navigate('/exam_add')} className='bg-blue-600 hover:bg-blue-900 text-white font-medium text-center px-4 py-2 rounded-md shadow-md transition duration-200'>
  +Add Exam
</button>


    </div>
    <table className='min-w-full border-collapse border border-gray-300'>
        <thead>
            <tr className='bg-gray-300 text-center text-black'>
            <th className='border border-gray-500 px-4 py-3'>Exam Date</th>
            <th className='border border-gray-500 px-4 py-3'>Exam Name</th>
            <th className='border border-gray-500 px-4 py-3'>Exam Type</th>
            <th className='border border-gray-500 px-4 py-3'>Exam Marks</th>
            <th className='border border-gray-500 px-4 py-3'>Class Level</th>
            <th className='border border-gray-500 px-4 py-3'>Room Number</th>
            <th className='border border-gray-500 px-4 py-3'>Update</th>
            <th className='border border-gray-500 px-4 py-3'>Delete</th>
            </tr>
        </thead>
        <tbody>
            {exams.map((exam) =>{
                return(
                  <tr key={exam._id}>
            <td className='border border-gray-500 px-4 py-3'>{exam.examDate}</td>
            <td className='border border-gray-500 px-4 py-3'>{exam.examName}</td>
            <td className='border border-gray-500 px-4 py-3'>{exam.examType}</td>
            <td className='border border-gray-500 px-2 py-3'>{exam.examMarks}</td>
            <td className='border border-gray-500 px-2 py-3'>{exam.classLevel}</td>
            <td className='border border-gray-500 px-2 py-3'>{exam.examRoomNumber}</td>
            <td className='border border-gray-600 px-2 py-3'>
            <button onClick={() => navigate(`/update_exam/${exam._id}`)} className='text-blue-700 hover:text-blue-900'> <FaEdit /></button>
            </td>
            <td className='border border-gray-600 px-2 py-3'>
            <button className='text-red-700 hover:text-red-900'> <FaTrash /></button>
            </td>
            </tr>

                )
            })}

        </tbody>

    </table>

        </div>
      
    </div>
  )
}

export default ExamManage
