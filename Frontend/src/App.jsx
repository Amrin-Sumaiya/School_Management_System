import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WrapperScreen from './Wrapper/WrapperScreen';
import Dashboard from './Pages/Dashboard.jsx'; // Import the Dashboard page
import All_Students from './Students/All_Students.jsx';
import All_Teachers from './Teacher/All_Teachers.jsx';
import Add_Student from './Students/Add_Student/Add_student.jsx';


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
        </Routes>
        </WrapperScreen>
      </Router>
     
      
    </div>
  );
};

export default App;


