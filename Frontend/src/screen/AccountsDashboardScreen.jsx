import { FaUser, FaMoneyBillWave, FaChalkboardTeacher } from 'react-icons/fa';
import ChartBar from '../common/ChartBar.jsx';
import { AbsentStudentList } from '../components/AbsentStudentList.jsx';
import { AbsentTeacherList } from '../components/AbsentTeacherList.jsx';

const AccountsDashboardScreen = () => {
  const dashboardData = [
    {
      title: 'Student Fees Collected',
      count: 12000,
      colour: '#FCCBDD',
      icon: <FaMoneyBillWave size={25} />,
    },
    {
      title: 'Teacher Salaries Paid',
      count: 8000,
      colour: '#D0F0C0',
      icon: <FaChalkboardTeacher size={25} />,
    },
    {
      title: 'Outstanding Dues',
      count: 3000,
      colour: '#FFE5B4',
      icon: <FaUser size={25} />,
    },
  ];

  return (
    <div className="p-3 flex flex-col gap-5">
      {/* Top Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {dashboardData.map((item, index) => (
          <div
            key={index}
            style={{ backgroundColor: item.colour }}
            className="shadow-lg rounded-lg text-black p-4 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">{item.title}</p>
              {item.icon}
            </div>
            <p className="text-center text-2xl font-bold">
              {item.count.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Attendance Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AbsentStudentList
          studentList={[
            { name: 'Jahid', class: 8, roll: 804, dueAmount: 2000, contact: '016798355466' },
            { name: 'Kalam', class: 3, roll: 302, dueAmount: 2000, contact: '013798355437' },
            { name: 'Jashim', class: 5, roll: 507, dueAmount: 2000, contact: '017798355706' },
          ]}
        />
        <AbsentTeacherList
          teacherList={[
            { name: 'Siam', subject: 'Bangla', ID: 804, contact: '017798355466' },
            { name: 'Jahan', subject: 'ICT', ID: 302, contact: '016798355437' },
            { name: 'Kaiyum', subject: 'English', ID: 507, contact: '013798355706' },
          ]}
        />
      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ChartBar title="Student Fee Collection Trend" />
        <ChartBar title="Teacher Salary Payment Trend" />
      </div>
    </div>
  );
};

export default AccountsDashboardScreen;
