/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../common/baseUrl';

// Slice Creates

const authSlice = createSlice({
  name: 'auth',
  initialState: {}, // initial state
  reducers: {
    startLoadingData: (state) => {
      state.loading = true;
      state.error = '';
    },
    getTokenDataSuccessFully: (state, action) => {
      state.token = action?.payload;
      state.loading = false;
      state.error = '';
    },

    getUserInfoDataSuccessFully: (state, action) => {
      state.userInfo = action?.payload;
      state.loading = false;
      state.error = '';
    },

    failedLoadingData: (state, action) => {
      state.error = action?.payload;
      state.loading = false;
    },
    removeLoginData: (state) => {
      state.token = {};
      state.userInfo = {};
      state.loading = false;
      state.error = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoadingData,
  getTokenDataSuccessFully,
  getUserInfoDataSuccessFully,
  failedLoadingData,
  removeLoginData,
} = authSlice.actions;

// Api call for login
export const getAuthData =
  (apiData = {}) =>
  async (dispatch) => {
    const { username, password } = apiData;
    dispatch(startLoadingData());

    if (username && password) {
      try {
        const { data } = await axios.post(
          `${baseUrl}/api/user-role/login`,
          { email: username, password: password }
          // { headers: { Authorization: 'Basic d2ViOjEyMw==' } }
        );
        if (data) {
          localStorage.setItem('token', JSON.stringify(data?.token));
          const decodedUserToken = jwtDecode(data?.token);

          localStorage.setItem('userInfo', JSON.stringify(decodedUserToken));
          dispatch(getTokenDataSuccessFully(data?.token));
          dispatch(getUserInfoDataSuccessFully(decodedUserToken));
          const navigate = useNavigate();
          navigate('/');
        }
      } catch (error) {
        dispatch(
          failedLoadingData(error?.response?.data?.message || error?.message)
        );
      }
    }
  };

export const getReloadAuthDataAction = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  dispatch(getTokenDataSuccessFully(token));
  dispatch(getUserInfoDataSuccessFully(userInfo));
};

export const resetUserInfoAfterEditAction = (data) => async (dispatch) => {
  dispatch(getUserInfoDataSuccessFully(data));
};

export const logOutAction = () => async () => {
  localStorage.clear();
  location.reload();
};

export default authSlice.reducer;
