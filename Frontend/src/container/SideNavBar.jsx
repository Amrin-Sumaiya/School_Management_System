import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  
} from '@material-tailwind/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export function ExpandIcon({ id, open }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`${
        id === open ? 'rotate-180' : ''
      } h-3 w-3 transition-transform font-[500]`}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19 9l-7 7-7-7'
      />
    </svg>
  );
}

const SideNavBar = ({ menuList = [] }) => {
  const [activeParent, setActiveParent] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState('');
  const [openSidebar, setOpenSidebar] = useState(true);
  const [open, setOpen] = useState(null);
  const language = useSelector((state) => state?.languageData?.language);

  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 1.2 },
  };

  const handleOpen = (value) => setOpen(open === value ? null : value);

  return (
    <div
      className={`${
        openSidebar ? 'w-72' : 'w-16'
      } min-h-screen p-2 shadow-blue-gray-900/5 bg-indigo-100 transition-all duration-300 relative`}
    >
      {/* Sidebar Toggle Button */}
      <div
        className="absolute top-0 -right-3 w-7 h-10 flex items-center justify-center bg-white border-2 border-white shadow-md rounded-3xl cursor-pointer hover:bg-blue-gray-100 transition duration-300"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        {openSidebar ? (
          <FaChevronLeft className="h-4 w-4 text-indigo-900" />
        ) : (
          <FaChevronRight className="h-4 w-4 text-indigo-900 rotate-180" />
        )}
      </div>
 {/* SrollBar */}
      <div>
        {menuList?.map((menuItem, i) => (
          <Accordion
            key={i}
            open={open === menuItem?.id}
            animate={CUSTOM_ANIMATION}
            icon={
              menuItem?.childList?.length > 0 &&
              openSidebar && <ExpandIcon id={menuItem?.id} open={open} />
            }
            className="mb-2"
          >
            <Link to={menuItem?.link}>
              <div
                className={`group flex space-x-2 items-center ${
                  open === menuItem?.id ? 'text-white' : 'hover:text-indigo-500'
                } rounded-md ${i === 0 && 'mt-4'} text-[14px] font-[500] cursor-pointer pl-3 hover:bg-tertiary transition duration-300`}
              >
                <span
                  className={`text-xl group-hover:text-darkTextSecondary ${
                    open === menuItem?.id
                      ? 'text-indigo-500'
                      : 'text-textPrimary hover:text-indigo-500'
                  }`}
                >
                  {menuItem.iconValue}
                </span>
                <AccordionHeader
                  onClick={() => handleOpen(menuItem.id)}
                  className={`border-none font-[500] group-hover:text-darkTextSecondary ${
                    language === 'bangla'
                      ? 'font-custom text-[16px]'
                      : 'text-[14px]'
                  } ${
                    open === menuItem?.id
                      ? 'text-indigo-500 font-semibold'
                      : 'text-textPrimary hover:text-indigo-500'
                  } ${!openSidebar ? 'py-[25px]' : ''}`}
                >
                  {!openSidebar
                    ? ''
                    : language === 'english'
                    ? menuItem?.englishDescription
                    : menuItem?.banglaDescription}
                </AccordionHeader>
              </div>
            </Link>

            {menuItem?.childList && (
              <AccordionBody className="py-0">
                <ul className="pl-8 space-y-1">
                  {menuItem?.childList.map((subItem) => (
                    <li key={subItem?.id}>
                      <Link to={subItem?.link}>
<button
  type="button"
  className={`my-1 flex items-center gap-2 w-full text-left text-[14px] font-[500] py-1 px-4 transition duration-300 hover:text-indigo-500 ${
    activeSubItem === subItem?.sequenceNumber
      ? 'text-indigo-500 font-semibold'
      : 'text-textPrimary'
  }`}
  onClick={() => setActiveSubItem(subItem?.sequenceNumber)}
>
  {/* > icon before text */}
  <span className="text-sm font-bold">&gt;</span>

  {/* Subitem text */}
  <span>
    {!openSidebar
      ? ''
      : language === 'english'
      ? subItem?.englishDescription
      : subItem?.banglaDescription}
  </span>
</button>



                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionBody>
            )}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
