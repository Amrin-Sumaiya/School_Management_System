import Add_student from '../screen/Add_student';
import Add_Teacher from '../screen/Add_Teacher';
import All_Students from '../screen/All_Students';
import Update_Student from '../screen/Update_Student';
import All_Teachers from '../screen/All_Teachers';
import Update_Teacher from '../screen/Update_Teacher';
import ClassroomManagement from '../screen/Classroom';
import All_Subject from '../screen/All_Subject';
import Add_Subject from '../screen/Add_Subjects';
import Add_Exam from '../screen/Exam_Add';
import ExamListScreen from '../screen/ExamListScreen';
import UpdateExam from '../screen/Exam_Update';
import Attendance from '../screen/attendance';
import NotFoundScreen from '../screen/NotFoundScreen';
import SuperAdminDashboard from '../screen/SuperAdminDashboard';
import ClasswisePresent from '../screen/ClasswisePresent';
import ClasswiseAbsent from '../screen/ClasswiseAbsent';
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
    path: '/add_teacher',
    components: <Add_Teacher />,
  },
  {
    path: '/update-teacher/:id',
    components: <Update_Teacher />,
  },
  {
    path: 'attendace',
    components: <Attendance />,
  },
  {
    path: '/student-list',
    components: <All_Students />,
  },
    {
    path: '/add_student',
    components: <Add_student />,
  },
  {
    path: '/update_student/:id',
    components: <Update_Student />,
  },
  {
    path: '/classroom-list',
    components: <ClassroomManagement />,
  },
  {
    path: '/subject-list',
    components: <All_Subject />,
  },
  {
    path: '/add-subject',
    components: <Add_Subject />,
  },
  {
    path: '/exam-list',
    components: <ExamListScreen />,
  }, 
  {
    path: '/exam_add',
    components: <Add_Exam />,
  },
  {
    path: '/update-exam/:id',
    components: <UpdateExam />,
  },

  {
   path: '/classwise-present-students',
   components: <ClasswisePresent />,
  },
    {
   path: '/classwise-absent-students',
   components: <ClasswiseAbsent />,
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
