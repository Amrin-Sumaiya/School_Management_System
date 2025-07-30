import { FaPeopleGroup } from 'react-icons/fa6';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdManageAccounts } from 'react-icons/md';

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
        iconValue: <FaPeopleGroup />,
        link: '/all-teacher-list',
      },
    ],
  },

  {
    id: 4,
    sequenceNumber: 4.0,
    englishDescription: 'Student Management',
    banglaDescription: `ছাত্র ব্যবস্থাপনা`,
    iconValue: <HiOutlineClipboardDocumentList />,
    link: '#',
    childList: [
      {
        id: 5,
        sequenceNumber: 4.1,
        englishDescription: 'Student List',
        banglaDescription: 'ছাত্র তালিকা',
        // iconValue: <HiOutlineClipboardDocumentList />,
        link: '/student-list',
      },
    ],
  },
  {
    id: 6,
    sequenceNumber: 5.0,
    englishDescription: 'Exam Management',
    banglaDescription: `পরীক্ষা ব্যবস্থাপনা`,
    iconValue: <HiOutlineClipboardDocumentList />,
    link: '#',
    childList: [
      {
        id: 7,
        sequenceNumber: 5.1,
        englishDescription: 'Exam List',
        banglaDescription: 'পরীক্ষা তালিকা',
        // iconValue: <HiOutlineClipboardDocumentList />,
        link: '/exam-list',
      },
    ],
  },
  {
    id: 8,
    sequenceNumber: 6.0,
    englishDescription: 'Report',
    banglaDescription: `রিপোর্ট`,
    iconValue: <TbReportSearch />,
    link: '#',
    childList: [
      {
        id: 9,
        sequenceNumber: 6.1,
        englishDescription: 'Exam Report',
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
    ],
  },
  {
    id: 16,
    sequenceNumber: 6.0,
    englishDescription: 'Report',
    banglaDescription: `রিপোর্ট`,
    iconValue: <TbReportSearch />,
    link: '#',
    childList: [
      {
        id: 17,
        sequenceNumber: 6.1,
        englishDescription: 'Exam Report',
        banglaDescription: 'পরীক্ষার রিপোর্ট',
        iconValue: <TbReportSearch />,
        link: '/exam-report',
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
