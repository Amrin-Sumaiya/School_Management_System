import Chart from 'react-apexcharts';

const ChartBar = () => {
  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    },
    // title: {
    //   text: ' Admission Data Analysis',
    //   align: 'center',
    //   style: {
    //     fontSize: '18px',
    //     fontWeight: 'bold',
    //     color: '#333',
    //   },
    // },
  };

  const series = [
    {
      name: 'Series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  return (
    <div className='shadow-md rounded-lg '>
      {/* Chart Title */}
      <h3 className='text-xl font-semibold text-gray-800 mb-6 bg-blue-gray-50 text-center'>
        Yearly Admission Record Data
      </h3>

      {/* Chart Component */}
      <div className='chart-container'>
        <Chart
          options={options}
          series={series}
          type='bar'
          width='100%'
          height='400'
        />
      </div>
    </div>
  );
};

export default ChartBar;
