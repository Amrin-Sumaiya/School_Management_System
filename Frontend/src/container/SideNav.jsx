import SideNavBar from '../container/SideNavBar';
import { superAdminNav, teacherSideNav } from './SuperAdminSideNav';

const SideNav = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <>
      <SideNavBar
        menuList={
          userInfo?.role === 'SuperAdmin'
            ? superAdminNav
            : userInfo?.role === 'Teacher'
            ? teacherSideNav
            : null
        }
      />
    </>
  );
};

export default SideNav;
