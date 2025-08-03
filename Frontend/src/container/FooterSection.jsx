const FooterSection = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-center rounded-b-md  shadow-md bg-gray-800 py-1  '>
      {/* <p className='text-sm text-white font-custom'>
        © Contact about Website
        <span className='customPeragraphTwo text-[0.9rem]'>

        </span>
      </p> */}

      <p className='px-2 py-2 lg:block hidden'>||</p>
      <p className='text-sm text-white font-custom'>
                  &copy; {new Date().getFullYear()} DreamSchool Locator. All rights reserved. Developed By
                            <a
            href='https://www.linkedin.com/in/sumaiya-amrin-3b2157283/'
            className='font-bold text-sm text-white ml-2 font-custom'
          >
            Sumaiya Amrin
          </a>
      </p>
    </div>
  );
};

export default FooterSection;
