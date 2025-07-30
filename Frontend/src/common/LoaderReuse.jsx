import { ScaleLoader } from 'react-spinners';

const LoaderReuse = () => {
  return (
    <>
      <div className='flex justify-center items-center'>
        <ScaleLoader
          className='ml-2 flex items-center'
          color='#46B9EE'
          height={20}
        />
      </div>
    </>
  );
};

export default LoaderReuse;
