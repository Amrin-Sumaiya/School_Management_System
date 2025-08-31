import { Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';

import { getReloadAuthDataAction } from '../redux/slices/LoginSlice/authSlice';
import LoginScreen from '../screen/LoginScreen';
import TeacherApplication from './TeacherApplication';
import WrapperLayout from './WrapperLayout';
import AccountsApplication from './AccountsApplication';

const SuperAdminApplication = lazy(() => import('./SuperAdminApplication'));
const AdminApplication = lazy(() => import('./TeacherApplication'));

const StartupScreen = () => {
  const fromReduxUserInformation = useSelector((state) => state?.authData);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const dispatch = useDispatch();

  if (!fromReduxUserInformation?.token) {
    const localStorageToken = JSON.parse(localStorage.getItem('token'));

    if (localStorageToken) {
      dispatch(getReloadAuthDataAction());
    } else {
      <LoginScreen />;
    }
  }

  return (
    <>
      {fromReduxUserInformation?.token ? (
        <Suspense
          fallback={
            <div className='absolute top-[50%] left-[50%]'>
              <RingLoader
                siz={80}
                color='#1296E0'
              />
            </div>
          }
        >
          <WrapperLayout>
            {userInfo?.role === 'SuperAdmin' ? (
              <SuperAdminApplication />
            ) : userInfo?.role === 'Teacher' ? (
              <TeacherApplication />
            ) :userInfo?.role === 'Accounts' ? (
              <AccountsApplication />
            ) :
            null}
          </WrapperLayout>
        </Suspense>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};

export default StartupScreen;
