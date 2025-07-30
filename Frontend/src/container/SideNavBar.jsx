import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
  const language = useSelector((state) => state?.languageData?.language);

  const handleParentClick = (parentId) => {
    console.log(parentId);
    setActiveParent(activeParent === parentId ? null : parentId);
  };
  const [open, setOpen] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(true);
  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 1.2 },
  };
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div
      className={` ${
        openSidebar ? 'w-72' : 'w-[90px] '
      } bg-white min-h-screen p-5  mt-3   sticky top-0 duration-300  shadow-md hidden lg:block rounded-r-md`}
    >
      <img
        src='../../src/assets/control.png'
        className={`absolute cursor-pointer -right-3 top-2 w-9 shadow-sm
           border-2 rounded-full moving-element-left   ${
             !openSidebar && 'rotate-360 '
           } `}
        onClick={() => setOpenSidebar(!openSidebar)}
      />

      <div className=''>
        {menuList?.map((menuItem, i) => {
          return (
            <Accordion
              key={i}
              open={open === menuItem?.id}
              animate={CUSTOM_ANIMATION}
              icon={
                menuItem?.childList?.length > 0 &&
                openSidebar && (
                  <ExpandIcon
                    id={menuItem?.id}
                    open={open.toString()}
                  />
                )
              }
              // onClick={() => {
              //   handleParentClick(!openSidebar ? "" : item?.id);
              //   setActiveParent(item);
              // }}

              // key={i}
              className='mb-2 '
            >
              <Link to={menuItem?.link}>
                <div
                  className={`group flex space-x-2 items-center  ${
                    open === menuItem?.id
                      ? ' text-cyan-500'
                      : ' hover:text-cyan-500'
                  } rounded-md ${
                    i === 0 && 'mt-4'
                  } text-[14px] font-[500]  cursor-pointer hover:text-darkTextSecondary pl-3  hover:bg-tertiary  transition ease-in-out delay-150 duration-300 `}
                >
                  <span
                    className={`text-xl  group-hover:text-darkTextSecondary  ${
                      open === menuItem?.id
                        ? ' text-cyan-500'
                        : 'text-textPrimary hover:text-cyan-500'
                    }`}
                  >
                    {menuItem.iconValue}
                  </span>
                  <AccordionHeader
                    onClick={() => handleOpen(menuItem.id)}
                    className={`border-none font-[500]  cursor-pointer group-hover:text-darkTextSecondary  ${
                      language == 'bangla'
                        ? 'font-custom text-[16px]'
                        : 'text-[14px] '
                    }   ${
                      open === menuItem?.id
                        ? ' text-cyan-500 font-semibold'
                        : 'text-textPrimary hover:text-cyan-500 '
                    }  ${!openSidebar ? 'py-[25px]' : ''}`}
                  >
                    {!openSidebar
                      ? ''
                      : language == 'english'
                      ? menuItem?.englishDescription
                      : menuItem?.banglaDescription}
                  </AccordionHeader>
                </div>
              </Link>
              {menuItem?.childList && (
                <AccordionBody className='py-0'>
                  <ul className='pl-6'>
                    {menuItem?.childList?.map((subItem) => {
                      return (
                        <button
                          key={subItem?.id}
                          type='button'
                          className=' text-[14px] font-[500] text-slate-500   leading-10 cursor-pointer  hover:text-darkTextSecondary transition ease-in-out delay-150 duration-300 hover:translate-x-2 hover:scale-110 w-full text-left'
                          onClick={() => {
                            setActiveSubItem(subItem?.sequenceNumber);
                          }}
                        >
                          <Link to={subItem?.link}>
                            <button
                              type='button'
                              className={`my-1 flex items-center  justify-between gap-2   ${
                                activeSubItem === subItem?.sequenceNumber
                                  ? ' text-cyan-500 font-semibold'
                                  : 'text-textPrimary hover:text-cyan-500'
                              }`}
                            >
                              <span>{subItem?.icon ? subItem?.icon : '-'}</span>

                              <span>
                                {!openSidebar
                                  ? '-'
                                  : language == 'english'
                                  ? subItem?.englishDescription
                                  : subItem?.banglaDescription}
                              </span>
                            </button>
                          </Link>
                        </button>
                      );
                    })}
                  </ul>
                </AccordionBody>
              )}
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};
export default SideNavBar;
