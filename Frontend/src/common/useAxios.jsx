import { useState } from 'react';
import axiosAuthInstance from './axiosAuthInstance';
import { baseUrl } from './baseUrl';
const useAxios = (initialValue = {}) => {
  const [response, setResponse] = useState({
    loading: false,
    error: null,
    data: initialValue,
  });
  const [serverError, setServerError] = useState('');
  const { loading, error, data } = response;
  const handleReset = () =>
    setResponse({
      loading: false,
      error: null,
      data: initialValue,
    });

  const fetcher = async ({ options, callback }) => {
    setResponse((prev) => ({
      ...prev,
      loading: true,
      error: null,
      data: initialValue,
    }));
    // setAuthToken();

    axiosAuthInstance({
      ...options,
      url: baseUrl + options.url,
    })
      .then(({ data }) => {
        if (data) {
          setResponse((prev) => ({
            ...prev,
            loading: false,
            error: null,
            data: data,
          }));
          // if any success message or function dispatch required, we can do this by passing this callback function
          if (typeof callback === 'function') {
            return callback(data);
          }
        }
      })
      .catch((error) => {
        // console.log('backend Error====>>>', error?.message);
        setServerError(error?.message);
        setResponse((prev) => ({
          ...prev,
          loading: false,
          //   error: errorMsg(error) ?? convertErrorStatusToText(error),
          error: error?.response?.data?.message,
          data: initialValue,
        }));
      });
  };

  return { fetcher, loading, error, data, handleReset, serverError };
};

export default useAxios;
