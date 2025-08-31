import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import ChartBar from '../common/ChartBar.jsx';
import DashboardStatsCard from '../common/Linechart.jsx';
import axios from 'axios'
import { AbsentStudentList } from '../components/AbsentStudentList.jsx';
import { AbsentTeacherList } from '../components/AbsentTeacherList.jsx';

const SuperAdminDashboard = () => {
  const [absentStudents, setAbsentStudents] = useState([]);
  const [absentTeachers, setAbsentTeachers] = useState([]);
  const [dashboardData, setDashBoardData] = useState([ 
    {
      title: 'All Teachers',
      count: 20,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Present Teachers',
      count: 16,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'All Students',
      count: 125,
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Present Students',
      count: 118,
      bgColor: 'bg-purple-100',
    },
 ]);

 useEffect(() => {
const fetchAbsentStudents = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/attendance/absent-students-today");
    setAbsentStudents(response.data);
  } catch (error) {
    console.error("Error fetching absent students: ", error);
  }
};


  // const fetchAbsentTeachers = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/teachers/absent_teachers');
  //     setAbsentTeachers(response.data);
  //   } catch (error) {
  //     console.error('Error Fetching absent teachers: ', error);
  //   }
  // }

  fetchAbsentStudents();
  // fetchAbsentTeachers();
 }, [])

  return (
   <div>
      <div className='flex flex-col items-center p-3'>
        {/* Dashboard Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3 w-full'>
          {dashboardData?.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} shadow-lg rounded-lg text-black p-3 flex flex-col gap-3`}
            >
              <div className='flex justify-between items-center'>
                <p className='text-lg font-bold'>{item.title}</p>
                <FaUser className='text-4xl' size={25} />
              </div>
              <p className='text-center text-3xl font-bold'>{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Absent Lists */}
      <div className='px-3 grid grid-cols-2 gap-3'>
        <AbsentStudentList studentList={absentStudents} />
        <AbsentTeacherList teacherList={absentTeachers}   />
      </div>

      {/* Charts */}
      <div className='grid grid-cols-2 justify-between gap-3 p-3'>
        <ChartBar />
       <DashboardStatsCard />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
