import My_studentList from '../screen/My_studentList';
import Attendance from '../screen/attendance';
import NotFoundScreen from '../screen/NotFoundScreen';
import TeacherDashboard from '../screen/TeacherDashboard';
import AssignRoutes from './AssignRoutes';
import AllResult from '../screen/All_Result';
import ResultOfClassTeacher from '../screen/ResultOfClassTeacher';



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
///specific_students_result
  {
    path : '/specific_students_result',
    components: <ResultOfClassTeacher />,

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
