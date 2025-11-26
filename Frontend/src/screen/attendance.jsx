import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: "Present" | "Absent" }
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // Fetch and sort students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `https://backend-just.onrender.com/api/oneclassteacher/attendancebyteacher/class/${userInfo?.classTeacher}`
        );
        const sorted = res.data.sort((a, b) => {
          const idA = parseInt(a.studentId, 10);
          const idB = parseInt(b.studentId, 10);
          return idA - idB;
        });
        setStudents(sorted);
      } catch (err) {
        console.error('Error fetching students:', err);
        toast.error('Failed to fetch students.');
      }
    }; 

    fetchStudents();
  }, []);

  // Toggle attendance status
  const handleToggle = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === 'Present' ? 'Absent' : 'Present',
    }));
  };

  const today = new Date();
  const formatted = today.toISOString().split('T')[0];

  // Submit attendance
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formattedData = students.map((student) => ({
        id: student.id,
        status: attendance[student.id] || 'Absent',
      }));

      await axios.post(
        'https://backend-just.onrender.com/api/attendance/student_attendance',
        {
          studentId: formattedData,
          date: formatted,
          remarks: '',
        }
      );

      toast.success('Attendance submitted successfully!');
      setShowModal(true);
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit attendance.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <div className='bg-indigo-50 shadow-lg rounded-xl p-6'>
        <h2 className='text-3xl font-serif font-semibold text-black text-center mb-6'>
          Attendance Sheet 
        </h2>

        <div className='overflow-x-auto'>
          <table className='min-w-full table-fixed border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-300 text-center text-black'>
                <th className='border border-gray-500 px-4 py-3 w-1/4'>
                  Student ID
                </th>
                <th className='border border-gray-500 px-4 py-3 w-1/2'>Name</th>
                <th className='border border-gray-500 px-4 py-3 w-1/4'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id || index}>
                  <td className='border border-gray-500 px-4 py-3 text-center'>
                    {student.studentId}
                  </td>
                  <td className='border border-gray-500 px-4 py-3 text-center'>
                    {student.name}
                  </td>
                  <td className='border border-gray-500 px-4 py-3 text-center'>
                    <label className='inline-flex items-center justify-center gap-2 w-full'>
                      <input
                        type='checkbox'
                        checked={attendance[student.id] === 'Present'}
                        onChange={() => handleToggle(student.id)}
                        className='form-checkbox h-5 w-5 text-green-600'
                      />
                      <span className='inline-block w-16 text-center'>
                        {attendance[student.id] || 'Absent'}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='text-center mt-6'>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-6 rounded transition duration-200`}
          >
            {loading ? 'Submitting...' : 'Submit Attendance'}
          </button>
        </div>
      </div>

      {/* Modal for feedback can be implemented here if needed */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded shadow-lg w-96 text-indigo-800 text-center'>
      <div className="flex justify-center mb-4">
        <div className="rounded-full border-4 border-green-800 p-4 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
            <h3 className='text-xl font-semibold mb-4'>Attendance Submitted Successfully For Today</h3> 
            <button onClick={() => setShowModal(false)}
              className='mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
                Close

            </button>

          </div>
          </div>

      )}
    </div>
  );
};

export default Attendance;
