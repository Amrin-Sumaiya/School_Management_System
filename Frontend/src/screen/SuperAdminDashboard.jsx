import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import ChartBar from '../common/ChartBar.jsx';
import DashboardStatsCard from '../common/Linechart.jsx';
import axios from 'axios';
import { AbsentStudentList } from '../components/AbsentStudentList.jsx';
import { AbsentTeacherList } from '../components/AbsentTeacherList.jsx';

const SuperAdminDashboard = () => {
  const [absentStudents, setAbsentStudents] = useState([]);
  const [presentStudents, setPresentStudents] = useState(0);
  const [allStudents, setAllStudents] = useState(0);
  const [allTeachers, setAllTeachers] = useState(0);
  const [absentTeachers, setAbsentTeachers] = useState([]);

  useEffect(() => {
    // Fetch all students
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get('school-virid-iota.vercel.app/api/student');
        setAllStudents(res.data.length);
      } catch (error) {
        console.error('Error fetching all students: ', error);
      }
    };

    // Fetch all teachers
    const fetchAllTeachers = async () => {
      try {
        const res = await axios.get('school-virid-iota.vercel.app/api/teachers/all_teachers');
        setAllTeachers(res.data.length);
      } catch (error) {
        console.error('Error fetching all teachers: ', error);
      }
    };

    // Fetch absent students
    const fetchAbsentStudents = async () => {
      try {
        const response = await axios.get('school-virid-iota.vercel.app/api/attendance/absent-students-today');
        setAbsentStudents(response.data);
      } catch (error) {
        console.error('Error fetching absent students: ', error);
      }
    };

    // Fetch present students
const fetchPresentStudents = async () => {
  try {
    const response = await axios.get(
      `school-virid-iota.vercel.app/api/attendance/present-students-today?date=${
        new Date().toISOString().split('T')[0]
      }`
    );
    setPresentStudents(response.data); // directly set number
  } catch (error) {
    console.error('Error fetching present students: ', error);
  }
};



    fetchAllStudents();
    fetchAllTeachers();
    fetchPresentStudents();
    fetchAbsentStudents();
   
  }, []);

  const dashboardData = [
    { title: 'All Teachers', count: allTeachers, bgColor: 'bg-blue-100' },
    { title: 'All Students', count: allStudents, bgColor: 'bg-yellow-100' },
    { title: 'Present Students', count: presentStudents.length, bgColor: 'bg-green-100' },
    { title: 'Absent Students', count: absentStudents.length, bgColor: 'bg-red-100' },
  ];

  return (
    <div>
      <div className="flex flex-col items-center p-3">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
          {dashboardData?.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} shadow-lg rounded-lg text-black p-3 flex flex-col gap-3`}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">{item.title}</p>
                <FaUser className="text-4xl" size={25} />
              </div>
              <p className="text-center text-3xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Absent Lists */}
      <div className="px-3 grid grid-cols-2 gap-3">
        <AbsentStudentList studentList={absentStudents} />
        <AbsentTeacherList teacherList={absentTeachers} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 justify-between gap-3 p-3">
        <ChartBar  />
        <DashboardStatsCard />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;