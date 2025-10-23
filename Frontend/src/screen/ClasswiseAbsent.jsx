import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUserTimes } from 'react-icons/fa'
import { format, set } from 'date-fns'

const ClasswiseAbsent = () => {
    const [absentStudents, setAbsentStudents] = useState([]);
    const [groupData, setGropuData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    //fetch absent students date wise
    const fetchAbsentStudents = async(date) => {
        setLoading (true);
        try{
            const res = await axios.get(
                `https://backend-just.onrender.com/api/attendance/absent-students-today?date=${date}`
            );

            const data = res.data || [];

            //students list by class wise
            const classwiseData = data.reduce((acc, student) => {
                const className = student.class || "Unassigned";
                if(!acc[className]) acc[className] = [];
                acc[className].push(student);
                return acc;
            }, {});

            setGropuData(classwiseData);
            setAbsentStudents(data);
        } catch (error){
            console.error("Error fetching absent students: ", error);
        } finally {
            setLoading(false);
        }
    }; 

    useEffect(() => {
        fetchAbsentStudents(selectDate);
    }, [selectDate]);

    // handle date changes method
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    }; 

    if (loading) {
        return (
                <div className="flex justify-center items-center h-screen">
      <p className="text-gray-700 text-xl font-semibold">Loading...</p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 text-gray-600 font-"></div>

    </div>
        )
    }

  return (
  <div className="p-6">
<div className="text-center mb-4">
  <h2 className="text-3xl font-bold text-red-500 flex items-center justify-center gap-2">
    <FaUserTimes className="text-red-600" />
    List of Class-wise Absent Students
  </h2>
</div>

<div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">

  <div className="text-left md:text-left text-gray-600">
    <p>
      Showing records for:{" "}
      <span className="font-semibold text-black">
        {format(new Date(selectDate), "PPP")}
      </span>
    </p>
    <p>Total Absent Students: {absentStudents.length}</p>
  </div>

 
  <div className="flex items-center gap-3">
    <label className="text-gray-700 font-medium">Select Date:</label>
    <input
      type="date"
      value={selectDate}
      onChange={handleDateChange}
      className="border border-gray-400 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
</div>





      {/* Class-wise Cards */}
      {Object.keys(groupData).length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No absent students found for this date.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupData).map(([className, students]) => (
            <div
              key={className}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-red-700 mb-3">
                 {className} <br></br>
                 (Total Absent ={students.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm text-center">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">SI</th>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Roll</th>
                      <th className="border p-2">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((stu, idx) => (
                      <tr
                        key={stu._id || idx}
                        className="hover:bg-gray-50 text-gray-700"
                      >
                        <td className="border p-2">{idx + 1}</td>
                        <td className="border p-2 font-medium">{stu.name}</td>
                        <td className="border p-2">{stu.roll}</td>
                        <td className="border p-2">{stu.contact || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClasswiseAbsent
