import Add_student from '../screen/Add_student';
import Add_Teacher from '../screen/Add_Teacher';
import All_Students from '../screen/All_Students';
import All_Teachers from '../screen/All_Teachers';
import Add_Exam from '../screen/Exam_Add';
import ExamListScreen from '../screen/ExamListScreen';
import NotFoundScreen from '../screen/NotFoundScreen';
import SuperAdminDashboard from '../screen/SuperAdminDashboard';
import AssignRoutes from './AssignRoutes';

const routes = [
  {
    path: '/',
    components: <SuperAdminDashboard />,
  },
  {
    path: '/all-teacher-list',
    components: <All_Teachers />,
  },
  {
    path: '/student-list',
    components: <All_Students />,
  },
  {
    path: '/exam-list',
    components: <ExamListScreen />,
  },
  {
    path: '/add_student',
    components: <Add_student />,
  },
  {
    path: '/add_teacher',
    components: <Add_Teacher />,
  },
  {
    path: '/exam_add',
    components: <Add_Exam />,
  },

  {
    path: '*',
    components: <NotFoundScreen />,
  },
];

const SuperAdminApplication = () => {
  return <AssignRoutes route={routes} />;
};

export default SuperAdminApplication;
