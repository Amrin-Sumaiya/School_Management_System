import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ColumnChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const teacherId = userInfo?.userID;

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {

        const res = await axios.get(
          `http://localhost:8000/api/attendance/daily_summary?teacherId=${teacherId}`
        );
        setAttendanceData(res.data);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
      }
    };

    fetchAttendanceData();
  }, [teacherId]);

  return (
    <div className="w-full bg-gray-100 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">
            Daily Attendance
          </h5>
          <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
            Present vs Absent students (per day)
          </p>
        </div>
        <button className="text-sm text-blue-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          This Week
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={attendanceData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                value,
                name === "present" ? "Present" : "Absent",
              ]}
              labelFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Bar dataKey="present" fill="#A5D6A7" radius={[6, 6, 0, 0]} />
            <Bar dataKey="absent" fill="#EF9A9A" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t dark:border-gray-700 mt-4 pt-3">
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          Yesterday
        </button>
        <a
          href="#"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          View full attendance →
        </a>
      </div>
    </div>
  );
};

export default ColumnChart;
