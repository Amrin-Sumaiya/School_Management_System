import My_studentList from '../screen/My_studentList';
import Attendance from '../screen/attendance';
import NotFoundScreen from '../screen/NotFoundScreen';
import TeacherDashboard from '../screen/TeacherDashboard';
import AssignRoutes from './AssignRoutes';
import AllResult from '../screen/All_Result';



const routes = [
  {
    path: '/',
    components: <TeacherDashboard />,
  },
  {
    path: '/my-student-list',
    components: < My_studentList />,
  },

      {
    path: '/attendance',
    components: <Attendance />,
  },
  {
    path : '/all_result',
    components: <AllResult />,

  },

    {
    path: '*',
    components: <NotFoundScreen />,
  },
];

const TeacherApplication = () => {
  return <AssignRoutes route={routes} />;
};

export default TeacherApplication;
