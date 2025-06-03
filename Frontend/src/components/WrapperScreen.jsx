import React, { children } from 'react'
import SideNavBar from './SideNavBar'
import Header from './Header'
import Footer from './Footer'


const WrapperScreen = ({ children }) => {
  return (
    <div className="flex flex-col">
    <Header />
    <div className="flex flex-grow bg-gray-100">
      <div className=" h-full flex flex-col min-h-screen">
        <SideNavBar />
      </div>
    
      <div className="flex-grow max-h-screen overflow-hidden overflow-y-scroll">
        {children}
 
        </div>
    
    </div>
    <footer className="bg-gray-800 text-white py-1 ">
    <Footer />
    </footer>
  </div>
  );
};

export default WrapperScreen
