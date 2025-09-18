import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { grade: "A", Students: 15 },
  { grade: "B", Students: 22 },
  { grade: "C", Students: 18 },
  { grade: "D", Students: 8 },
  { grade: "F", Students: 3 },
];

const ColumnChart = () => {
  return (
    <div className="w-full bg-gray-100 rounded-lg  p-6">
      {/* Header */}
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">
            Grade Distribution
          </h5>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Number of students per grade
          </p>
        </div>
        <button className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          This Term
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Students" fill="#6495ED" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t dark:border-gray-700 mt-4 pt-3">
        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          Last Exam
        </button>
        <a
          href="#"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          View detailed results →
        </a>
      </div>
    </div>
  );
};

export default ColumnChart;
