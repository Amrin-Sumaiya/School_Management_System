// src/components/PerClassAbsentStudent.jsx
import React from 'react';

const PerClassAbsentStudent = ({ studentList }) => {
  return (
    <div className='bg-red-50 shadow-lg rounded-lg p-3'>
      <h2 className=' text-center font-bold  mb-3 text-black'>Today's Absent Students</h2>
      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-red-200'>
            <th className='border border-gray-300 p-2'>Name</th>
            <th className='border border-gray-300 p-2'>Class</th>
            <th className='border border-gray-300 p-2'>Roll</th>
            <th className='border border-gray-300 p-2'>Contact</th>
          </tr>
        </thead>
        <tbody>
          {studentList?.map((student, index) => (
            <tr key={index} className='text-center'>
              <td className='border border-gray-300 p-2'>{student.name}</td>
              <td className='border border-gray-300 p-2'>{student.class}</td>
              <td className='border border-gray-300 p-2'>{student.roll}</td>
              <td className='border border-gray-300 p-2'>{student.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerClassAbsentStudent;
