import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from "@material-tailwind/react";
import edu from '../assets/edu2.png';
import { FaBars, FaCog, FaUsers, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for the sidebar toggle

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar
  };

  return (
    <header className="p-3 px-10 bg-indigo-100 text-black  shadow-md">
      {/* Container for header content */}
      <div className="flex justify-between items-center">
        {/* Logo Section */}
       
        <div className="flex items-center gap-2">
          <img src={edu} alt="EduQuest Logo" className="w-14 h-14" />
          {/* Title */}
          <div className="flex items-center gap-6">
            <Typography variant="h2" color="black" className="font-serif">
              EduNexus
            </Typography>

          </div>
     
        </div>
        

        {/* Menu Icon for Mobile (toggle sidebar) */}
        <div className="sm:hidden">
          <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>

        {/* Navbar (Visible on Desktop) */}
        <nav className="hidden sm:flex space-x-6 items-center">

        
          <Link
            to="/settings"
            className="flex items-center gap-2 text-lg hover:text-blue-400 transition duration-200"
          >
            <FaCog className="h-5 w-5" />
            Settings
          </Link>
          <Link
            to="/users"
            className="flex items-center gap-2 text-lg hover:text-blue-400 transition duration-200"
          >
            <FaUsers className="h-5 w-5" />
            Users
          </Link>
          <button
            className="flex items-center gap-2 text-lg hover:text-blue-400 transition duration-200"
           // onClick={() => alert('Logging out...')}
          >
            <FaSignOutAlt className="h-5 w-5" />
            Logout
          </button>
        </nav>

        {/* Sidebar (Mobile View) */}
        {sidebarOpen && (
          <div className="sm:hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-10">
            <div className="bg-white w-64 h-full p-4 space-y-4">
              <button onClick={toggleSidebar} className="text-lg text-right">
                Close
              </button>
              <nav className="space-y-4">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 text-lg hover:text-blue-200 transition duration-200"
                  onClick={toggleSidebar}
                >
                  <FaCog className="h-5 w-5" />
                  Settings
                </Link>
                <Link
                  to="/users"
                  className="flex items-center gap-2 text-lg hover:text-blue-200 transition duration-200"
                  onClick={toggleSidebar}
                >
                  <FaUsers className="h-5 w-5" />
                  Users
                </Link>
                <button
                  className="flex items-center gap-2 text-lg hover:text-blue-200 transition duration-200"
                  onClick={() => {
                    toggleSidebar();
                  }}
                >
                  <FaSignOutAlt className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;




