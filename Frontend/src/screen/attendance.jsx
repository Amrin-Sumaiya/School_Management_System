import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: "Present" | "Absent" }
  const [loading, setLoading] = useState(false);
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
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit attendance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <div className='bg-indigo-50 shadow-lg rounded-xl p-6'>
        <h2 className='text-3xl font-semibold text-black text-center mb-6'>
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
    </div>
  );
};

export default Attendance;
