import { FaUser } from 'react-icons/fa';
import PerClassAbsentStudent from '../components/PerClassAbsentStudent.jsx';
import axios from 'axios';
import  PresentStudentList  from '../components/PresentStudentList.jsx';
import ColumnChart from '../common/ColumnChart.jsx';
import PieChart from '../common/PieChart.jsx';
import { useEffect, useState } from 'react';

const TeacherDashboard = () => {


  // Student data
  const [ absentStudents , setAbsentStudents ] =  useState([]);
  const [presentStudents, setPresentStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const teacherId = userInfo?.userID;
  const classId = userInfo?.classTeacher;
  
  useEffect(() => {
    const fetchAbsentStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/attendance/absent-students-today-by-teacherwise?date=${new Date().toISOString().split('T')[0]}&teacherId=${teacherId}`

        );
        setAbsentStudents(res.data);
      } catch (err) {
        console.error('Error fetching absent students:', err);
      }
    };

    const fetchPresentStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/attendance/present-students-today-by-teacherwise?date=${new Date().toISOString().split('T')[0]}&teacherId=${teacherId}`
        );
        setPresentStudents(res.data);
      } catch (err) {
        console.error('Error fetching present students:', err);
      }
    };

   const fetchTotalStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/oneclassteacher/attendancebyteacher/class/${classId}`
      );
      setTotalStudents(res.data.length);
    } catch (err){
      console.error('Error fetching total students: ', err);
    }
   }

    fetchAbsentStudents();
    fetchPresentStudents();
    fetchTotalStudents()
  }, [teacherId, classId]);

    const dashboardData = [
    { title: 'Total Students', count: totalStudents, colour: '#E9CCE2' },
    { title: 'Present Students', count: presentStudents.length, colour: '#D0F0C0' },
    { title: 'Absent Students', count: absentStudents.length, colour: '#FCCBDD' },
  ];



  return (
    <div>
      {/* Top cards */}
      <div className="flex flex-col items-center p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          {dashboardData.map((item, index) => (
            <div
              key={index}
              style={{ backgroundColor: item.colour }}
              className="shadow-lg rounded-lg text-black p-3 flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg  font-bold">{item.title}</p>
                <FaUser className="text-4xl" size={25} />
              </div>
              <p className="text-center text-3xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student lists */}
      <div className="px-3 grid grid-cols-2 gap-3">
        <PerClassAbsentStudent studentList={absentStudents} />
        <PresentStudentList studentList={presentStudents} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 justify-between gap-3 p-3">
        <ColumnChart />
        <PieChart />
      </div>
    </div>
  );
};

export default TeacherDashboard;
