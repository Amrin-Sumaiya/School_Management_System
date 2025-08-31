import { Card, Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { getLanguage } from '../redux/slices/LanguageSlice/languageSlice';
const TABLE_HEAD_ENG = ['SL', 'Name', 'Class', 'Roll Number', 'Contact'];
const TABLE_HEAD_BNG = ['ক্রমিক', 'নাম', 'ক্লাস', 'রোল নম্বর', 'যোগাযোগ'];

const convertMonth = (monthDate) => {
  const inputDate = new Date(monthDate);

  const monthName = inputDate.toLocaleString('en-us', { month: 'long' });
  return monthName;
};

export function AbsentStudentList({ studentList = [] }) {
  const language = useSelector(getLanguage);
  return (
    <div className='pb-3 md:pb-0'>
      <th className='flex justify-center bg-[#f38b8b98] py-1  rounded-t-md'>
        {language == 'english'
          ? 'List of Absent Students Today'
          : 'অনুপস্থিত শিক্ষার্থীদের তালিকা'}
      </th>
      <Card className='max-h-[16rem] min-h-[16rem]  w-full overflow-scroll rounded-none'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead className='sticky top-0'>
            <tr>
              {language === 'english'
                ? TABLE_HEAD_ENG.map((head) => (
                    <th
                      key={head}
                      className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center'
                    >
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal leading-none opacity-70'
                      >
                        {head}
                      </Typography>
                    </th>
                  ))
                : TABLE_HEAD_BNG.map((head) => (
                    <th
                      key={head}
                      className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center'
                    >
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal leading-none opacity-70'
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
            </tr>
          </thead>

          <tbody className='text-center'>
            {studentList?.map(
              (
                { name, class: className, roll, contact: phoneNumber },
                index
              ) => (
                <tr
                  key={index}
                  className='even:bg-blue-gray-50/50'
                >
                  <td className=''>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className=''>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className=''>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {className}
                    </Typography>
                  </td>

                  <td className='p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {roll}
                    </Typography>
                  </td>
                  <td className='p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {phoneNumber}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {studentList?.length === 0 && (
          <div className='py-5 text-center text-red-700'>
            {/* <WarningMessage error='No Data Found !' /> */}
            No Student Found!
          </div>
        )}
      </Card>
    </div>
  );
}
