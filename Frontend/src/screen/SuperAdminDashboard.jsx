import { FaUser } from 'react-icons/fa';
import ChartBar from '../common/ChartBar.jsx';
import { AbsentStudentList } from '../components/AbsentStudentList.jsx';
import { AbsentTeacherList } from '../components/AbsentTeacherList.jsx';

const SuperAdminDashboard = () => {
  const dashboardData = [
    {
      title: 'All Teachers',
      count: 20,
      colour: '#FA5A7D',
    },
    {
      title: 'Present Teachers',
      count: 16,
      colour: '#BF83FF',
    },
    {
      title: 'All Students',
      count: 125,
      colour: '#65BBA7',
    },

    {
      title: 'Present Students',
      count: 118,
      colour: '#FCCBDD',
    },
  ];
  return (
    <div>
      <div className=' flex flex-col items-center  p-3'>
        {/* Dashboard Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3 w-full'>
          {dashboardData?.map((item, index) => (
            <div
              key={index}
              style={{ backgroundColor: item?.colour }}
              className=' shadow-lg rounded-lg  text-black p-3 flex flex-col gap-3'
            >
              <div className='flex justify-between items-center '>
                <p className='text-lg font-bold'>{item?.title}</p>
                <FaUser
                  className=' text-4xl  '
                  size={25}
                />
              </div>

              <p className='text-center text-3xl font-bold'>{item?.count}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='px-3 grid grid-cols-2 gap-3'>
        <AbsentStudentList
          studentList={[
            { name: 'Jahid', class: 8, roll: 804, contact: '016798355466' },
            { name: 'Kalam', class: 3, roll: 302, contact: '013798355437' },
            { name: 'Jashim', class: 5, roll: 507, contact: '017798355706' },
          ]}
        />
        <AbsentTeacherList
          teacherList={[
            {
              name: 'Siam',
              subject: 'Bangla',
              ID: 804,
              contact: '017798355466',
            },
            { name: 'Jahan', subject: 'ICT', ID: 302, contact: '016798355437' },
            {
              name: 'Kaiyum',
              subject: 'English',
              ID: 507,
              contact: '013798355706',
            },
          ]}
        />
      </div>
      <div className='grid grid-cols-2 justify-between gap-3 p-3'>
        <ChartBar />
        <ChartBar />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
