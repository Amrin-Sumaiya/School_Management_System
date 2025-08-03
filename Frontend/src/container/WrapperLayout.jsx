import FooterSection from './FooterSection';
import SideNav from './SideNav';
import TopNavbar from './TopNavbar';

const WrapperLayout = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
<div className="flex flex-col min-h-screen bg-[#eeeeee]">
  <TopNavbar />
  <div className="flex flex-1">
    <SideNav />
    <main className="flex-1 overflow-y-auto p-4">
      {children}
      <FooterSection />
    </main>
  </div>
</div>

        
      
    
  );
};

export default WrapperLayout;
