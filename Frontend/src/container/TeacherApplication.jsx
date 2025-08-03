import All_Students from '../screen/All_Students';
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
    path: '/student-list',
    components: <All_Students />,
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
