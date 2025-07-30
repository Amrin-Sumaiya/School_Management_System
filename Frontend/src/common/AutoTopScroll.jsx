import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you're using React Router

const AutoTopScroll = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null; // This component doesn't render anything, it just handles scrolling
};

export default AutoTopScroll;
