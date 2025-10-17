import { Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TABLE_HEAD = ['SL', 'Name', 'Class', 'Roll Number', 'Contact'];

// const convertMonth = (monthDate) => {
//   const inputDate = new Date(monthDate);

//   const monthName = inputDate.toLocaleString('en-us', { month: 'long' });
//   return monthName;
// }; 

export function AbsentStudentList() {
  const  [ studentList, setStudentList] = useState([]) ;
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    const fetchAbsentStudents = async () => {
      try {
        setLoading(true);
        const res = await axios.get( `school-virid-iota.vercel.app/api/attendance/absent-students-today?date=${today}`);
        setStudentList(res.data || []);
      } catch (error){
        console.error('error fetching absent students:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAbsentStudents();
  }, [today]);
 
  return (
    <div className='pb-3 md:pb-0'>
      <th className='flex justify-center bg-[#f38b8b98] py-1  rounded-t-md'> List of Absent Students Today ({today})  </th>
  <Card className="max-h-[16rem] min-h-[16rem] w-full overflow-scroll rounded-none">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="sticky top-0">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-center">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-5 text-blue-600">
                  Loading...
                </td>
              </tr>
            ) : studentList?.length > 0 ? (
              studentList.map(
                ({ name, class: className, roll, contact: phoneNumber }, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td>
                      <Typography variant="small" color="blue-gray">
                        {index + 1}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small" color="blue-gray">
                        {name}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small" color="blue-gray">
                        {className}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray">
                        {roll}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray">
                        {phoneNumber}
                      </Typography>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className="py-5 text-red-700">
                  No Student Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}