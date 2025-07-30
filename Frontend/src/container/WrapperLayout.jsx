import FooterSection from './FooterSection';
import SideNav from './SideNav';
import TopNavbar from './TopNavbar';

const WrapperLayout = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className='bg-[#eeeeee]'>
      <TopNavbar />
      <div className='lg:flex'>
        <div>
          <SideNav />
        </div>
        <div className='flex-1 overflow-x-hidden'>
          <div className=' px-3 py-3'>
            <div className='shadow-md rounded-t-md  bg-white min-h-screen'>
              {children}
            </div>
            <div className=''>
              <FooterSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapperLayout;
