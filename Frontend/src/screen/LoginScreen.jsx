import { Button, Input } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';
import { IoMdRefresh } from 'react-icons/io';
import { LuEyeOff } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthData } from '../redux/slices/LoginSlice/authSlice';
import logo from '../../src/assets/edu2.png';
import { FaRegEye } from 'react-icons/fa6';
import { ScaleLoader } from 'react-spinners';

const LoginScreen = () => {
  const [captcha, setCaptcha] = useState(Math.random().toString(36).slice(8));
  const [valid, setValid] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { register, formState: { errors }, handleSubmit } = useForm();
  const userInfo = useSelector((state) => state?.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refreshString = () => setCaptcha(Math.random().toString(36).slice(8));

  //match captcha
  const matchCaptcha = (data) => {
    if (data?.captchaData === captcha) {
      setValid(false);
      return true;
    } else {
      setValid(true);
      alert('Wrong captcha! Please try again.'); //  warning
      return false;
    }
  };

//handle submit
  const onSubmit = (data) => {
    if (!matchCaptcha(data)) return; // Stop if captcha invalid
    dispatch(getAuthData(data)); // Dispatch login
  };

//for login user
  useEffect(() => {
    if (userInfo?.error) {
      alert(userInfo.error); // Username or password warning
    }
  }, [userInfo?.error]);

  return (
    <div className=" min-h-screen flex items-center justify-center p-4">
      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-gradient-to-b from-blue-100 to-blue-50 backdrop-blur-lg rounded-xl shadow-lg p-6 sm:p-10">
        
        {/* LOGO */}
        <div className='sm:mx-auto sm:w-full sm:max-w-sm text-center'>
          <img className='mx-auto h-20 w-20 object-contain' src={logo} alt='Your Company' />
          <h2 className='mt-2 text-xl font-bold text-black'>লগ ইন করুন</h2>
        </div>

        {/* FORM */}
        <div className='mt-5'>
          {userInfo?.error && (
            <div className='text-red-500 text-sm py-2 flex items-center'>
              <CgDanger size={16} className='mr-1' />
              {userInfo.error} {/*Backend error display */}
            </div>
          )}

          <form autoComplete='off' className='text-black' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              
              {/* USERNAME */}
              <Input
                autocomplete='off'
                color='black'
                label='User Name'
                variant='standard'
                {...register('username', { required: true })}
                className='text-blue-gray-900 text-base font-semibold'
              />
              {errors.username && (
                <div className='text-red-400 text-[12px] font-[500] py-1 flex items-center'>
                  <CgDanger size={13} /> User Name field is required
                </div>
              )}

              {/* PASSWORD */}
              <Input
                color='black'
                type={showPass ? 'text' : 'password'}
                label='Password'
                variant='standard'
                {...register('password', { required: true })}
                className='text-blue-gray-900 text-base font-semibold'
                icon={
                  showPass ? (
                    <LuEyeOff color='orange' size={20} onClick={() => setShowPass(!showPass)} />
                  ) : (
                    <FaRegEye color='orange' size={20} onClick={() => setShowPass(!showPass)} />
                  )
                }
              />
              {errors.password && (
                <div className='text-red-400 text-[12px] font-[500] py-1 flex items-center'>
                  <CgDanger size={13} /> Password field is required
                </div>
              )}

              {/* CAPTCHA */}
              <div className='flex items-center justify-between py-2 gap-3'>
                <h3 className='py-2 px-3 font-serif font-bold text-[18px] tracking-widest rounded-md border-[1px] border-gray-400'>
                  <s>{captcha}</s>
                </h3>
                <IoMdRefresh size={20} className='cursor-pointer' onClick={refreshString} />
              </div>
              <Input
                color='black'
                error={valid}
                label='Type the characters above'
                {...register('captchaData', { required: true })}
                className='text-blue-gray-900 text-base font-semibold'
              />

              {/* SUBMIT */}
              <div className='flex items-center justify-end py-4'>
                <Button
                  type='submit'
                  className='bg-[#2456a0] text-white font-semibold py-2 px-8 rounded-md w-full'
                  disabled={userInfo?.loading}
                >
                  Log in
                </Button>
                {userInfo?.loading && <ScaleLoader className='ml-2' color='#46B9EE' height={20} />}
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
