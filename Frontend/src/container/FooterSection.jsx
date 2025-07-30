const FooterSection = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-center rounded-b-md  shadow-md bg-white py-1 mt-[2px] '>
      <p className='text-sm text-gray-500 font-custom'>
        © সর্বস্বত্ব সংরক্ষিত
        <span className='customPeragraphTwo text-[0.9rem]'>
          <a
            href='https://www.linkedin.com/in/'
            className='font-bold text-sm text-blue-gray-600 ml-2 font-custom'
          >
            Sumaiya Amrin
          </a>
        </span>
      </p>

      <p className='px-2 lg:block hidden'>||</p>
      <p className='text-sm text-gray-500 font-custom'>
        ডেভেলপ এবং রক্ষণাবেক্ষণ
        <span className='customPeragraphTwo text-[0.9rem]'>
          <a
            href='https://www.linkedin.com/in/'
            className='font-bold text-sm text-blue-gray-600 ml-2 font-custom'
          >
            Sumaiya Amrin
          </a>
        </span>
      </p>
    </div>
  );
};

export default FooterSection;
