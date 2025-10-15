import { Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TABLE_HEAD = [
  'Roll Number',
  'Name',
  'Class',
  'Exam',
  'Subject',
  'Contact',
];

export function AbsentTeacherList() {
  const [failedStudents, setFailedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  // ✅ Fetch failed students directly (no need to load class list separately)
  useEffect(() => {
    const fetchFailedStudents = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/api/result/failed_students/${currentYear}`
        );

        // The backend now already sends class name as "class"
        setFailedStudents(res.data || []);
      } catch (error) {
        console.error('Error fetching failed students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFailedStudents();
  }, [currentYear]);

  return (
    <div className="pb-3 md:pb-0">
      <th className="flex justify-center bg-[#f38b8b98] py-1 rounded-t-md">
        List of Failed Students ({currentYear})
      </th>

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
                <td colSpan={6} className="py-5 text-blue-600">
                  Loading...
                </td>
              </tr>
            ) : failedStudents?.length > 0 ? (
              failedStudents.map((student) => (
                <tr key={student.studentId}  className="even:bg-blue-gray-50/50">
                  <td className="p-4">{student.rollNumber}</td>
                  <td className="p-4">{student.name}</td>
                 <td className="p-4">{student.class?.Class || 'N/A'}</td>

                  <td className="p-4">{student.exam}</td>
                  <td className="p-4">{student.subject}</td>
                  <td className="p-4">{student.gurdianContact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-5 text-red-700 text-center">
                  No Failed Students Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
