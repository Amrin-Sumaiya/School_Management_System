// PieChart.jsx
import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Present", value: 52.8, color: "#8BC809" },   // blue
  { name: "Absent", value: 26.8, color: "#FA8F91" }, // teal
 // purple
];

const PieChart = () => {
  return (
    <div className=" w-full bg-gray-100 rounded-lg   p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h5 className="text-lg font-bold text-gray-900 dark:text-white">
         Student Attendance Report
        </h5>
        <button className="text-sm text-blue-600 hover:underline">
          This Month
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer >
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              label={({ value }) => `${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, `${name}`]} />
            <Legend verticalAlign="bottom" height={36} />
          </RePieChart>
        </ResponsiveContainer>
      </div> <br />
      <br />
      <br />

      {/* Footer */}
      <div className="flex justify-between items-center border-t dark:border-gray-700 mt-4 pt-3">
        <button className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          Last 7 days
        </button>
        <a
          href="#"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
           View detailed attendance →
        </a>
      </div>
    </div>
  );
};

export default PieChart;
