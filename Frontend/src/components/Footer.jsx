import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>


      {/* Copyright Section */}
      <div className=" border-gray-700 pt-2 text-center">
        <p className="text-sm text-gray-500 py-2">
          &copy; {new Date().getFullYear()} DreamCollege Locator. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


