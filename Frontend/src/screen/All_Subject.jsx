import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import SubjectModal from '../components/subject_modal';



const All_Subject = () => {

    const [subject, setSubject] = useState ([])
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentSubject, setCurrentSubject] =useState({
         id: '',
          subjectCode: '',
          subjectName: '',
          description: ''
    })
    const navigate = useNavigate()

            const fetchData = async()=>{
            try {

              const response =  await axios.get("http://localhost:8000/api/subject/all_subjects");
              setSubject(response.data)

            } catch (error){
                console.log("Error while fetching data", error)
            }
        };

    useEffect (() =>{
        fetchData()
    }, [])
    //open modal and populate current subject
const openModal = (subject) => {
  console.log("Editing subject:", subject);

  // Fix the missing ID issue
  const normalizedSubject = {
    ...subject,
    id: subject.id || subject._id // fallback to _id
  };

  setCurrentSubject(normalizedSubject);
  setModalOpen(true);
};

    const closeModal = () => {
  setModalOpen(false);
  setCurrentSubject({
    id: '',
    subjectCode: '',
    subjectName: '',
    description: ''
  });
};



        //submit update subject in modal

        const handleUpdateSubmit = async (e) => {
            e.preventDefault();

            try{
                await axios.put(`http://localhost:8000/api/subject/update/${currentSubject.id}`, currentSubject);
                closeModal();
                fetchData()
            } catch ( error){
                console.error("Update failed", error);
            }
        }
      //hanlde input change in modal
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setCurrentSubject({ ...currentSubject, [name]: value })      
    }

    //delete subject 
        const handleDelete = async (id) => {

          try{
            await axios.delete(`http://localhost:8000/api/subject/delete_subject/${id}`);
            toast.success("Subject deleted Successfully");
            fetchData();
    
          }catch (error){
            console.error("Delete failed", error);
            toast.error("Failed to delete subject");
          }
        }
  return (
    <div className='p-4'>
      <div className='bg-indigo-50 shadow-lg rounded-xl p-6'>
        <div className=' mb-4 relative'>
          <h2 className='text-3xl text-center  font-semibold text-black'>Academic Subjects Directory</h2>
          <button onClick={() => navigate("/add_subject")} className='bg-gray-800 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg shadow'>
            + Add Subject
          </button>
        </div>
        <table className='min-w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200 text-center text-black'>
              <th className='border border-gray-500 px-4 py-3 text-center'>SubjectCode</th>
              <th className='border border-gray-500 px-4 py-3 text-center'>SubjectName</th>
              <th className='border border-gray-500 px-4 py-3 text-center'>Description</th>
              <th className='border border-gray-500 px-4 py-3 text-center'>Update</th>
              <th className='border border-gray-500 px-4 py-3 text-center'>Delete</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {subject.map(( subjects, index)=>{
                return (
                 <tr key={subjects.id || index} >
              <td className='border border-gray-500 px-4 py-3'>{subjects.subjectCode}</td>
              <td className='border border-gray-500 px-4 py-3'>{subjects.subjectName}</td>
              <td className='border border-gray-500 px-4 py-3'>{subjects.description}</td>
              <td className='border border-gray-500 px-4 py-3'>
                <button className='text-blue-600 hover:text-blue-800 ' onClick={() => openModal(subjects)}>  
                     <FaEdit /></button> </td>
               <td className='border border-gray-500 px-4 py-3'>
          <button className='text-red-800 hover:text-red-300 ' onClick={() => handleDelete(subjects.id || subjects._id)}>  
                     <FaTrash /></button> </td>
              
            </tr>

                )
            })}

          </tbody>
        </table>
      </div>

      <SubjectModal
      isOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={handleUpdateSubmit}
      subject={currentSubject}
      onChange={handleInputChange}
      isEditMode={true} />
    </div>
  );
};

export default All_Subject;
