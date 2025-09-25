import { Card, Typography } from '@material-tailwind/react';

const TABLE_HEAD = [ 'Roll Number', 'Name',  'Class',  'Exam',  'Subject', 'Contact'];

export function AbsentTeacherList({ teacherList = [] }) {
  return (
    <div className="pb-3 md:pb-0">
      <th className="flex justify-center bg-[#f38b8b98] py-1 rounded-t-md">
        List of Failed Students
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
            {teacherList?.map(
              ({ name, subject, ID, contact: phoneNumber }, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {index + 1}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {name}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {subject}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {ID}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {phoneNumber}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {teacherList?.length === 0 && (
          <div className="py-5 text-red-700 text-center">
            No Teacher Found!
          </div>
        )}
      </Card>
    </div>
  );
}
