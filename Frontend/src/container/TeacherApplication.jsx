import All_Students from '../screen/All_Students';
import NotFoundScreen from '../screen/NotFoundScreen';
import TeacherDashboard from '../screen/TeacherDashboard';
import AssignRoutes from './AssignRoutes';

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
    path: '*',
    components: <NotFoundScreen />,
  },
];

const TeacherApplication = () => {
  return <AssignRoutes route={routes} />;
};

export default TeacherApplication;
