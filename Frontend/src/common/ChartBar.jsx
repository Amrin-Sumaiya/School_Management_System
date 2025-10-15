import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const ChartBar = () => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  // 🧩 Fetch data from backend
  const fetchYearlyData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admission-yearly_count");
      const data = res.data;

      const currentYear = new Date().getFullYear();
      const maxYearInData = data.length ? Math.max(...data.map(item => item._id)) : currentYear;

      // Show last 5 years dynamically
      const startYear = Math.max(currentYear, maxYearInData - 4);
      const yearsRange = Array.from({ length: 5 }, (_, i) => startYear + i);

      const counts = yearsRange.map(year => {
        const item = data.find(d => d._id === year);
        return item ? item.totalStudents : 0;
      });

      setCategories(yearsRange);
      setSeries([{ name: "Admissions", data: counts }]);
    } catch (error) {
      console.error("Error fetching admission data:", error);
    }
  };

  // 🕒 Auto-refresh chart every 10 seconds
  useEffect(() => {
    fetchYearlyData(); // first run
    const interval = setInterval(fetchYearlyData, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  // ⚙️ Chart options with animation
  const options = {
    chart: {
      id: "students-bar",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,       // smooth transition speed (1s)
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    xaxis: {
      categories,
      title: { text: "Admission Year", style: {  fontSize: "16px", fontWeight: "bold" } },
      labels: { rotate: -45 }
    },
    yaxis: {
      title: { text: "Number of Students", style: {  fontSize: "13px", fontWeight: "bold"} },
    },
    title: {
      text: "Yearly Admission Record Data",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold" },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 6,
      },
    },
  };

  return (
    <div className="shadow-md rounded-lg p-4 bg-white">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="400"
      />
    </div>
  );
};

export default ChartBar;
