import Chart from 'react-apexcharts';

const DashboardStatsCard = () => {
  const options = {
    chart: {
      type: 'line',
      height: 280,
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['blue', '#C84BC6'], // purple tones
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: ['Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb'],
      labels: { style: { colors: 'gray-200' } },
    },
    yaxis: {
      labels: { style: { colors: '#A0AEC0' } },
    },
    grid: {
      borderColor: '#2D3748',
    },
    tooltip: {
      theme: 'dark',
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: 'Clicks',
      data: [40, 55, 65, 30, 50, 70],
    },
    {
      name: 'CPC',
      data: [30, 40, 60, 80, 35, 60],
    },
  ];

  return (
    <div className="bg-gray-200 text-center text-gray-800 p-4 rounded-lg shadow-md">
        <h2 className='font-bold flex text-center text-xl'>School Performance</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-blue-400">Clicks</p>
          <p className="text-xl font-semibold">42,3k</p>
        </div>
        <div>
          <p className="text-sm text-blue-400">CPC</p>
          <p className="text-xl font-semibold">$5.40</p>
        </div>
        <div>
          <button className="border border-gray-600 px-2 py-1 rounded text-sm text-gray-800">
            Last week
          </button>
        </div>
      </div>

      <Chart options={options} series={series} type="line" height={250} /> <br />

      <div className="border-t border-gray-700 mt-4 pt-4 text-center">
        <button className="bg-red-200 text-black px-4 py-2 text-sm font-bold rounded-md">
          View full report
        </button>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
