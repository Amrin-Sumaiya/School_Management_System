import React from "react";
import { FaUser } from "react-icons/fa";
import ChartBar from '../common/ChartBar.jsx'



const Dashboard = () => {

  return (
    <div className=" bg-gray-200 flex flex-col items-center py-10 ">
      {/* Dashboard Header */}
 
      <h2 className="text-2xl font-bold text-gray-800 mb-6"> Dashboard Overveiw</h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full px-8">
        {/* Total Teachers */}
        <div className="bg-orange-100 shadow-lg rounded-lg p-6 flex items-center text-black">
          <FaUser className="text-4xl mr-4 opacity-80" />
          <div>
            <p className="text-3xl font-bold">150</p>
            <p className="text-lg">All Teachers</p>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 flex items-center text-black">


          <FaUser className="text-4xl mr-4 opacity-80" />
          <div>
            <p className="text-3xl font-bold">8670</p>
            <p className="text-lg">All Students</p>
          </div>
        </div>

        {/* Present Students */}
        <div className="bg-green-100 shadow-lg rounded-lg p-6 flex items-center text-black">
          <FaUser className="text-4xl mr-4 opacity-80" />
          <div>
            <p className="text-3xl font-bold">8140</p>
            <p className="text-lg">Present Students</p>
          </div>
        </div>

        {/* Total Applying Users */}
        <div className="bg-red-200 shadow-lg rounded-lg p-6 flex items-center text-black">
          <FaUser className="text-4xl mr-4 opacity-80" />
          <div>
            <p className="text-3xl font-bold">530</p>
            <p className="text-lg">Absent Students</p>
          </div>
        </div>
      </div>
      <br />

       {/* add charrt section */}

<div className="w-full px-8  ">
<ChartBar  />
      

      </div>

    </div>
  );
};

export default Dashboard;


