import { FaPeopleGroup } from 'react-icons/fa6';
import {RiSchoolLine} from 'react-icons/ri';
import { BiBookAlt} from 'react-icons/bi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdManageAccounts } from 'react-icons/md';
import { FaUserGraduate } from 'react-icons/fa';


import { TbReportSearch } from 'react-icons/tb';
export const superAdminNav = [
  
  {
    id: 1,
    sequenceNumber: 1.0,
    englishDescription: 'Dashboard',
    banglaDescription: 'ড্যাশবোর্ড',
    iconValue: <LuLayoutDashboard />,
    link: '/',
  },
      {
    id: 8,
    sequenceNumber: 8.0,
    englishDescription: 'Student Management',
    banglaDescription: `ছাত্র ব্যবস্থাপনা`,
    iconValue: <FaUserGraduate />,
    link: '#',
    childList: [
      {
        id: 9,
        sequenceNumber: 8.1,
        englishDescription: 'Student List',
        banglaDescription: 'ছাত্র তালিকা',
        link: '/student-list',
      },
    ],
  },
  {
    id: 2,
    sequenceNumber: 2.0,
    englishDescription: 'Teacher Management',
    banglaDescription: `শিক্ষক ম্যানেজমেন্ট`,
    iconValue: <MdManageAccounts />,
    link: '#',
    childList: [
      {
        id: 3,
        sequenceNumber: 2.1,
        englishDescription: 'Teacher List',
        banglaDescription: 'শিক্ষক তালিকা',
        link: '/all-teacher-list',
      },
    ],
  },
    {
    id: 4,
    sequenceNumber: 4.0,
    englishDescription: 'ClassRoom  Management',
    banglaDescription: `শ্রেণীকক্ষ ব্যবস্থাপনা`,
    iconValue: <RiSchoolLine />,
    link: '#',
    childList: [
      {
        id: 5,
        sequenceNumber: 4.1,
        englishDescription: 'Classroom List',
        banglaDescription: 'শ্রেণীকক্ষের তালিকা',
        link: '/classroom-list',
      },
    ],
  },
    {
    id: 6,
    sequenceNumber: 6.0,
    englishDescription: 'Subject Management',
    banglaDescription: `বিষয় ব্যবস্থাপনা`,
    iconValue: <BiBookAlt />,
    link: '#',
    childList: [
      {
        id: 7,
        sequenceNumber: 6.1,
        englishDescription: 'Subject List',
        banglaDescription: 'বিষয় তালিকা',
        link: '/subject-list',
      },
    ],
  },
    
  

  // {
  //   id: 10,
  //   sequenceNumber: 10.0,
  //   englishDescription: 'Exam Management',
  //   banglaDescription: `পরীক্ষা ব্যবস্থাপনা`,
  //   iconValue: <HiOutlineClipboardDocumentList />,
  //   link: '#',
  //   childList: [
  //     {
  //       id: 11,
  //       sequenceNumber: 10.1,
  //       englishDescription: 'Exam List',
  //       banglaDescription: 'পরীক্ষা তালিকা',
  //       link: '/exam-list',
  //     },
  //   ],
  // },
  {
    id: 12,
    sequenceNumber: 12.0,
    englishDescription: 'Result Management',
    banglaDescription: `রিপোর্ট`,
    iconValue: <TbReportSearch />,
    link: '#',
    childList: [
      {
        id: 13,
        sequenceNumber: 12.1,
        englishDescription: 'All Students Result',
        banglaDescription: 'পরীক্ষার রিপোর্ট',
        iconValue: <TbReportSearch />,
        link: '/exam-report',
      },
    ],
  },
];

export const teacherSideNav = [
  {
    id: 1,
    sequenceNumber: 1.0,
    englishDescription: 'Dashboard',
    banglaDescription: 'ড্যাশবোর্ড',
    iconValue: <LuLayoutDashboard />,
    link: '/',
  },

  {
    id: 13,
    sequenceNumber: 5.0,
    englishDescription: 'Student Management',
    banglaDescription: `ছাত্র ব্যবস্থাপনা`,
    iconValue: <HiOutlineClipboardDocumentList />,
    link: '#',
    childList: [
      {
        id: 14,
        sequenceNumber: 5.1,
        englishDescription: 'Student List',
        banglaDescription: 'ছাত্র তালিকা',
        // iconValue: <HiOutlineClipboardDocumentList />,
        link: '/student-list',
      },
            {
        id: 17,
        sequenceNumber: 5.2,
        englishDescription: 'Attendance List',
        banglaDescription: 'শিক্ষার্থীদের উপস্থিতির তালিকা',
        // iconValue: <HiOutlineClipboardDocumentList />,
        link: '/attendance',
      },
    ],
  },
  {
    id: 16,
    sequenceNumber: 6.0,
    englishDescription: 'Result Management',
    banglaDescription: `ফলাফল ব্যবস্থাপনা`,
    iconValue: <TbReportSearch />,
    link: '#',
    childList: [
      {
        id: 17,
        sequenceNumber: 6.1,
        englishDescription: 'Result Submission',
        banglaDescription: 'ফলাফল জমা',
        iconValue: <TbReportSearch />,
        link: '/all_result',
      },
    ],
  },
];

export const accountSideNav = [
  {
    id: 1,
    sequenceNumber: 1.0,
    englishDescription: 'Dashboard',
    banglaDescription: 'ড্যাশবোর্ড',
    iconValue: <LuLayoutDashboard />,
    link: '/',
  },

  {
    id: 13,
    sequenceNumber: 5.0,
    englishDescription: 'Student Management',
    banglaDescription: `ছাত্র ব্যবস্থাপনা`,
    iconValue: <HiOutlineClipboardDocumentList />,
    link: '#',
    childList: [
      {
        id: 14,
        sequenceNumber: 5.1,
        englishDescription: 'Student List',
        banglaDescription: 'ছাত্র তালিকা',
        // iconValue: <HiOutlineClipboardDocumentList />,
        link: '/student-list', 
      },
            {
        id: 17,
        sequenceNumber: 5.2,
        englishDescription: 'Attendance List',
        banglaDescription: 'শিক্ষার্থীদের উপস্থিতির তালিকা',
        // iconValue: <HiOutlineClipboardDocumentList />,
        link: '/attendance',
      },
    ],
  },
  
];

export const userNav = [
  {
    id: 1,
    sequenceNumber: 1.0,
    englishDescription: 'Dashboard',
    banglaDescription: 'ড্যাশবোর্ড',
    iconValue: <LuLayoutDashboard />,
    link: '/',
  },
];
