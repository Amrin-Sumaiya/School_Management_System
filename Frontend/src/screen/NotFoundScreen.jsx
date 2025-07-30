import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div className='shadow-md rounded-md  bg-white  min-h-screen flex justify-center items-center'>
      <div className='px-3 py-3 w-full'>
        <div className=''>
          <div className='text-center'>
            <h1 className='mb-4 text-9xl font-semibold text-red-500'>
              4<span className='animate-ping'>0</span>4
            </h1>
            <p className='mb-4 text-xl text-gray-600'>
              Oops! Looks like you're lost.
            </p>
            <div className='animate-bounce'>
              <svg
                className='mx-auto h-20 w-20 text-red-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                ></path>
              </svg>
            </div>
            <p className='mt-4 text-gray-600'>
              Let's get you back{' '}
              <Link
                to='/'
                class='text-blue-500'
              >
                home
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
