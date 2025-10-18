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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(getLanguage);
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
  };

  return (
    <nav className='top-0 z-50 py-2 bg-indigo-100 sticky shadow-md'>
      <div className='flex justify-between items-center px-4 lg:px-6'>
        {/* Mobile Sidebar Icon */}
        <div className='lg:hidden'>
          <AiOutlineMenuUnfold
            onClick={() => setOpen(true)}
            size='28'
            className='cursor-pointer'
          />
          <Drawer open={open} onClose={() => setOpen(false)}>
            {/* You can place MobileSideNav here */}
          </Drawer>
        </div>

        {/* Logo and Title */}
        <Link to='/' className='flex items-center gap-2'>
          <img
            src='/edu2.png'
            alt='Logo'
            className='w-10 h-auto lg:w-14'
          />
          <h2 className='font-bold text-lg hidden sm:block'>EduNexus</h2>
        </Link>

        {/* Language & Profile Section */}
        <div className='flex items-center gap-4'>


          {/* Profile Dropdown */}
          <Menu>
            <MenuHandler>
              <button title='User' className='flex items-center gap-2'>
                <span className='hidden lg:block text-sm font-semibold uppercase'>
                  {userInfo?.userName || 'User'}
                </span>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/3781/3781986.png'
                  alt='user'
                  className='w-10 h-10 rounded-full border border-black'
                />
              </button>
            </MenuHandler>
            <MenuList className='w-48'>
              <Link to='/profile-details'>
                <MenuItem className='flex items-center gap-2'>
                  <BiUser size={16} /> My Profile
                </MenuItem>
              </Link>
              <Link to='/change-password'>
                <MenuItem className='flex items-center gap-2'>
                  <MdPassword size={16} /> Change Password
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogOut} className='flex items-center gap-2 text-red-400'>
                <BiLogOutCircle size={16} /> Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
