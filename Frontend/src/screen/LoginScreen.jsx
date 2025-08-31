import { Button, Input } from '@material-tailwind/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';
import { IoMdRefresh } from 'react-icons/io';
import { LuEyeOff } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import ErrorValidate from '../common/ErrorValidate';
import { getAuthData } from '../redux/slices/LoginSlice/authSlice';
// import bgImage from '/assets/loginPage.svg';
import logo from '../../src/assets/edu2.png';

import { FaRegEye } from 'react-icons/fa6';
import { ScaleLoader } from 'react-spinners';

// import { login } from "../store/actions/userLoginAction";

const LoginScreen = () => {
  const [isEmailPage, setIsEmailPage] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get('key');
  const randomString = Math.random().toString(36).slice(8);
  const [text, setText] = useState('');
  const [captcha, setCaptcha] = useState(randomString);
  const [valid, setValid] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(8));
  };

  const matchCaptcha = (event) => {
    // event.preventDefault();
    if (event?.captchaData === captcha) {
      setValid(false);
      dispatch(getAuthData(event));
    } else {
      setValid(true);
    }
  };
  const userInfo = useSelector((state) => state?.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // dispatch(getAuthData(data));
    matchCaptcha(data);
    console.log(data);
  };

  // const handleEmailScreen = () => {
  //   setIsEmailPage(false);
  //   // navigate('/send-email');
  // };
  // console.log();

  return (
    <>
      <div className='bg-no-repeat bg-blue-50'>
        <div className='h-screen flex items-center  justify-center'>
          <div className=''>
            <div className='mx-auto py-5	g-white/10 lg:backdrop-blur-lg   text-black rounded-md lg:border-[1px] border-gray-600  blur-none z-100 lg:shadow-lg'>
              <div className='sm:mx-auto sm:w-full sm:max-w-sm  '>
                <img
                  className='mx-auto h-auto w-[30%]   '
                  src={logo}
                  alt='Your Company'
                />
                <h2 className='my-2 tracking-wide	 text-center text-xl font-bold leading-9 text-black'>
                  লগ ইন করুন
                </h2>
              </div>

              <div className='lg:px-20 px-5 '>
                {/* {userInfo?.error && <ErrorValidate error={userInfo?.error} />} */}
                <form
                  autoComplete='off'
                  className=' text-black'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='flex flex-col gap-2 '>
                    <Input
                      autocomplete='off'
                      color='black'
                      label='User Name'
                      variant='standard'
                      autoComplete='off'
                      {...register('username', { required: true })}
                      className='text-blue-gray-900 text-base font-semibold'
                    />
                    {!errors.username && (
                      <div className='text-red-400 text-[12px] font-[500] py-2'>
                        <p className='flex items-center '></p>
                      </div>
                    )}
                    {errors.username && (
                      <div className='text-red-400 text-[12px] font-[500] py-2'>
                        <p className='flex items-center '>
                          <CgDanger size={13} /> {`User Name field is required`}
                        </p>
                      </div>
                    )}
                    <Input
                      color='black'
                      type={showPass == true ? 'text' : 'password'}
                      autoComplete='off'
                      label='Password'
                      variant='standard'
                      {...register('password', { required: true })}
                      className='text-blue-gray-900 text-base font-semibold'
                      icon={
                        showPass == true ? (
                          <LuEyeOff
                            color='orange'
                            size={20}
                            onClick={() => setShowPass(!showPass)}
                          />
                        ) : (
                          <FaRegEye
                            color='orange'
                            size={20}
                            onClick={() => setShowPass(!showPass)}
                          />
                        )
                      }
                    />

                    {errors.password && (
                      <div className='text-red-400 text-[12px] font-[500] py-2'>
                        <p className='flex items-center '>
                          <CgDanger size={13} /> {`Password field is required`}
                        </p>
                      </div>
                    )}
                    <div className='flex items-center justify-between py-5 gap-5'>
                      <div className='flex items-center gap-2'>
                        <h3
                          className='py-[2px] px-3 w-20 font-serif font-bold text-[18px] tracking-widest rounded-md border-[1px] border-white '
                          // style={{
                          //   backgroundImage: `url(${bgImage})`,
                          //   backgroundPosition: 'bottom',
                          //   backgroundSize: 'cover',
                          // }}
                        >
                          <s>{captcha}</s>
                        </h3>
                        <IoMdRefresh
                          size={20}
                          className='cursor-pointer' 
                          onClick={() => refreshString()}
                        />
                      </div>
                      <p className='text-xs  text-sky-400 text-end '>
                        {`Forgot Password ? `}
                        <a
                          // onClick={() => setIsEmailPage(false)}
                          className='font-semibold leading-6 text-sky-500 hover:text-black cursor-pointer'
                        >
                        Click here 
                        </a>
                      </p>
                    </div>
                    <Input
                      color='black'
                      error={valid}
                      // variant='standard'
                      label='Type the characters above'
                      autoComplete='off'
                      {...register('captchaData', { required: true })}
                      className='text-blue-gray-900 text-base font-semibold'
                    />
                    {!errors.username && (
                      <div className='text-red-400 text-[12px] font-[500] py-2'>
                        <p className='flex items-center '></p>
                      </div>
                    )}
                  </div>

                  <div className='flex items-center justify-end py-2'>
                    <Button
                      type='submit'
                      className='bg-[#2456a0] text-white  font-semibold  py-[10px] px-8'
                      disabled={userInfo?.loading}
                      // onClick={handleHomeScreen}
                      // className="flex px-8 rounded-md  py-2 text-sm font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-sky-300"
                    >
                      Log in
                    </Button>
                    {userInfo?.loading && (
                      <ScaleLoader
                        className='ml-2 '
                        color='#46B9EE'
                        height={20}
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
