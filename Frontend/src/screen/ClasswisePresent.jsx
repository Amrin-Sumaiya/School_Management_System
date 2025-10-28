import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCheck } from "react-icons/fa";
import { format } from "date-fns";

const ClasswisePresent = () => {
  const [presentStudents, setPresentStudents] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [classes, setClasses] = useState([]); // all classes list
  const [selectedClass, setSelectedClass] = useState(""); // selected class

  //  Fetch all class list
  const fetchClasses = async () => {
    try {
      const res = await axios.get(
        "https://backend-just.onrender.com/api/class/all_classInfo"
      );
      setClasses(res.data || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Fetch all present students (but we’ll only show selected class)
  const fetchPresentStudents = async (date) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://backend-just.onrender.com/api/attendance/present-students-today?date=${date}`
      );
      const data = res.data || [];

      // Group by class
      const classwiseData = data.reduce((acc, student) => {
        const className = student.class || "Unassigned";
        if (!acc[className]) acc[className] = [];
        acc[className].push(student);
        return acc;
      }, {});

      setGroupedData(classwiseData);
      setPresentStudents(data);
    } catch (error) {
      console.error("Error fetching present students:", error);
    } finally {
      setLoading(false);
    }
  };

  //  fetch class list only
  useEffect(() => {
    fetchClasses();
  }, []);

  //  Fetch attendance data when date changes or class selected
  useEffect(() => {
    if (selectedClass) {
      fetchPresentStudents(selectedDate);
    }
  }, [selectedDate, selectedClass]);

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle class change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-gray-700 text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" p-6">

         <h2 className="text-3xl font-bold text-indigo-700 flex items-center justify-center gap-2">
          <FaUserCheck className="text-green-600" />
          Class-wise Present Students
        </h2>
      {/* Header */}
      <div className="text-center mb-4">

      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        {/* Left: Info */}
        <div className="text-left text-gray-600">
          <p>
            Showing records for:{" "}
            <span className="font-semibold text-black">
              {format(new Date(selectedDate), "PPP")}
            </span>
          </p>
          <p>Total Present Students: {presentStudents.length}</p>
        </div>

        {/* Right: Filters */}
        <div className="flex flex-col items-start gap-4">
          {/* Date Picker */}
          <div className="flex items-center gap-3">
            <label className="text-gray-900 font-bold">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-gray-400 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Class Selector */}
          <div className="flex items-center gap-2">
            <label className="text-gray-900 font-bold">Select Class:</label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="border border-gray-400 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select Class --</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls.Class}>
                  {cls.Class}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Class-wise Cards */}
      {!selectedClass ? (
        <p className=" bg-blue-300 text-center text-gray-900 text-lg mt-10 p-3 rounded-md">
          Please select a class to view present students.
        </p>
      ) : Object.keys(groupedData).length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No present students found for this date.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedData)
            .filter(([className]) => className === selectedClass)
            .map(([className, students]) => (
              <div
                key={className}
                className="bg-indigo-50 rounded-xl shadow-md border p-5 hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">
                  {className} ({students.length} Present)
                </h3>
                <div className="overflow-x-auto">
<table className="w-full border-collapse text-sm text-center">
  <thead>
    <tr className="bg-gray-200">
      <th className="border border-gray-700 p-2">SI</th>
      <th className="border border-gray-700 p-2">Name</th>
      <th className="border border-gray-700 p-2">Roll</th>
      <th className="border border-gray-700 p-2">Contact</th>
    </tr>
  </thead>
  <tbody>
    {students.map((student, index) => (
      <tr
        key={student._id || index}
        className="hover:bg-gray-50 text-black"
      >
        <td className="border border-gray-700 p-2">{index + 1}</td>
        <td className="border border-gray-700 p-2 font-medium">{student.name}</td>
        <td className="border border-gray-700 p-2">{student.roll}</td>
        <td className="border border-gray-700 p-2">{student.contact || "N/A"}</td>
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
  );
};

export default ClasswisePresent;
