import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import WrapperScreen from './Wrapper/WrapperScreen';
import Dashboard from './Pages/Dashboard.jsx'; // Import the Dashboard page
import All_Students from './Students/All_Students.jsx';
import All_Teachers from './Teacher/All_Teachers.jsx';
import Add_Teacher from './Teacher/Add_Teachers/Add_Teacher.jsx';
import Add_Student from './Students/Add_Student/Add_student.jsx';
import Update_Student from './Students/Add_Student/Update_Student.jsx';
import UpdateTeacher from './Teacher/Add_Teachers/Update_Teacher.jsx';

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

        </Routes>
        </WrapperScreen>
          <ToastContainer />
      </Router>
     
      
    </div>
  );
};

export default App;


