import {
  Button,
  Drawer,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { BiLogOutCircle, BiUser } from 'react-icons/bi';
import { MdOutlineLanguage, MdPassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  getLanguage,
  setLanguage,
} from '../redux/slices/LanguageSlice/languageSlice';
import {
  logOutAction,
  removeLoginData,
} from '../redux/slices/LoginSlice/authSlice';

const TopNavbar = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(getLanguage);
  const [active, setActive] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  useEffect(() => {
    const localStorageLanguage = localStorage.getItem('language');
    if (localStorageLanguage) {
      dispatch(setLanguage(localStorageLanguage));
    }
  }, []);
  const handleLogOut = () => {
    navigate('/');
    dispatch(logOutAction());
    dispatch(removeLoginData());
  };

  const handleToggle = (e) => {
    localStorage.setItem('language', e.target.value);
    dispatch(setLanguage(e.target.value));
    setActive();
  };

  return (
    <>
      <nav className='top-0  z-50 py-2   bg-[#e1f5fe]   sticky shadow-md transition duration-500 '>
        <div className='flex justify-around items-center  px-3'>
          <div className='hidden lg:block '>
            <Link
              to='/'
              className='flex justify-start gap-3 items-center pl-10'
            >
              <img
                src='../../src/assets/edu.png'
                className='cursor-pointer duration-500 z-10  lg:w-[10%] h-auto'
              />
              <h2 className='font-semibold text-lg'>EduNexus</h2>
            </Link>
          </div>
          <div className='w-[40%]'>
            <div className='flex items-center  gap-2'>
              <div className='block lg:hidden'>
                <AiOutlineMenuUnfold
                  onClick={openDrawer}
                  size='32'
                  className='bold'
                />
                <Drawer
                  open={open}
                  onClose={closeDrawer}
                >
                  {/* <MobileSideNav
                    menuList={
                      userInfo?.role === 'SuperAdmin'
                        ? superAdminNav
                        : userInfo?.role === 'Admin'
                        ? adminNav
                        : userNav
                    }
                    onClose={closeDrawer}
                  /> */}
                </Drawer>
              </div>
            </div>
          </div>
          <div className='w-[58%] block lg:hidden'>
            <Link
              to='/'
              className='flex justify-end pr-5'
            >
              <img
                src='/assets/logo/logo.png'
                className='cursor-pointer duration-500 z-10 w-[50%] h-auto lg:w-[8%] '
              />
            </Link>
          </div>
          <div className='w-[65%]'>
            <div className='lg:flex items-center justify-end  space-x-5 '>
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <span className='flex items-center justify-end'>
                  <Menu
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    <MenuHandler>
                      <Button className='hover:shadow-none bg-transparent border-none shadow-none text-black'>
                        <MdOutlineLanguage size={24} />
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem
                        onClick={handleToggle}
                        value='english'
                        className={`${
                          language == 'english' ? 'text-light-blue-400 ' : ''
                        }  `}
                      >
                        English
                      </MenuItem>
                      <MenuItem
                        onClick={handleToggle}
                        value='bangla'
                        className={`${
                          language == 'bangla' ? 'text-light-blue-400 ' : ''
                        }  `}
                      >
                        বাংলা
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  {/* <FaRegBell size={24} color="black" /> */}
                  <MenuHandler>
                    <button
                      type='button'
                      className='text-textPrimary  cursor-pointer'
                      title='User'
                    >
                      <div className='flex items-center justify-between gap-2'>
                        <span className='hidden lg:block text-base uppercase font-semibold'>
                          {userInfo?.userName ? userInfo?.userName : 'User'}
                        </span>
                        <img
                          className='w-10 h-10 p-[2px] rounded-full border-black text-sky-600 border-[1px]'
                          src='../../src/assets/profile.png'
                          alt='user photo'
                        />
                      </div>
                    </button>
                  </MenuHandler>
                </span>

                <MenuList className='w-[190px] border-none '>
                  <Link to='/profile-details'>
                    <MenuItem className='flex space-x-1 text-textPrimary  hover:bg-white hover:text-darkTextSecondary  transition ease-in-out delay-150 duration-300 '>
                      <span>
                        <BiUser size={16} />
                      </span>
                      <span className=''> My Profile</span>
                    </MenuItem>
                  </Link>

                  <MenuItem className=''>
                    <Link to='/change-password'>
                      <span className='flex space-x-1 text-textPrimary  hover:bg-white  hover:text-darkTextSecondary  transition ease-in-out delay-150 duration-300 '>
                        <MdPassword size={16} />
                        Change Password
                      </span>
                    </Link>
                  </MenuItem>

                  <MenuItem className=' text-textPrimary  hover:bg-white  hover:text-darkTextSecondary transition ease-in-out delay-150 duration-300'>
                    <button
                      type='button'
                      className='flex space-x-1'
                      onClick={() => handleLogOut()}
                    >
                      <BiLogOutCircle size={16} />

                      <span className='text-red-300'>Logout</span>
                    </button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavbar;
