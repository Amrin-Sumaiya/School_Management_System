import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const DashboardStatsCard = ({ teacherId }) => {
  const [series, setSeries] = useState([0, 0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    chart: {
      type: "pie",
      height: 280,
      background: "transparent",
    },
    labels: ["Presents", "Absents"],
    colors: ["#A5E9AD", "#F7B0C3"],
    legend: {
      position: "bottom",
      labels: {
        colors: "#374151", // Tailwind gray-700
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
      },
    },
  };

useEffect(() => {
  const fetchAttendanceData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `school-virid-iota.vercel.app/api/attendance/attendance-percentage?date=${new Date().toISOString().split("T")[0]}`
      );

      if (res.data) {
        setSeries([res.data.presentPercentage, res.data.absentPercentage]);
      }
    } catch (err) {
      console.error("Error fetching attendance percentage:", err);
      setError("Failed to load attendance data.");
    } finally {
      setLoading(false);
    }
  };

  fetchAttendanceData();
}, []);


  if (loading) return <p>Loading attendance data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-200 text-center text-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-xl mb-4">
        Total Students Attendance Performance
      </h2>

      <Chart options={options} series={series} type="pie" height={250} />
<br />
<br />  
<br />

      <div className="border-t border-gray-700 mt-4 pt-4 text-center">
        <button className="bg-red-200 text-black px-4 py-2 text-sm font-bold rounded-md">
          View full report
        </button>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
