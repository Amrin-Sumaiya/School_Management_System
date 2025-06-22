import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import WrapperScreen from './components/WrapperScreen.jsx';
import Dashboard from './screen/Dashboard.jsx'; // Import the Dashboard page
import All_Students from './screen/All_Students.jsx';
import All_Teachers from './screen/All_Teachers.jsx';
import Add_Teacher from './screen/Add_Teacher.jsx';
import Add_Student from './screen/Add_student.jsx';
import Update_Student from './screen/Update_Student.jsx';
import UpdateTeacher from './screen/Update_Teacher.jsx';
import StudentAttendance from './screen/attendance.jsx'
import Holiday from './Holiday/Vacation.jsx'
import Classroom from './screen/Classroom.jsx'
import Subjects from './screen/All_Subject.jsx'
import Add_Subject from './screen/Add_Subjects.jsx'



const App = () => {
  return (
    <div>
     
      <Router>
      <WrapperScreen>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/all_students" element={<All_Students />} />
        <Route path="/all_teachers" element={<All_Teachers />} />
        <Route path="/add_student" element={<Add_Student />} />  
        <Route path="/update_student/:id" element={<Update_Student />} />
        <Route path="/add_teacher" element={ <Add_Teacher />} />
        <Route path="/update_teacher/:id" element={ <UpdateTeacher />} />
        <Route path="/attendace/:id" element={ <StudentAttendance />} />
        <Route path="/vacation" element={<Holiday />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/add_subject" element={<Add_Subject />} />
  


        </Routes>
        </WrapperScreen>
          <ToastContainer />
      </Router>
     
      
    </div>
  );
};

export default App;


