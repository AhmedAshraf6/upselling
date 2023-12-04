import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { useDispatch } from 'react-redux';
import { clearStore } from '../features/user/userSlice';
import { toast } from 'react-toastify';
// import { clearStore } from '../features/user/userSlice';
const customFetch = axios.create({
  baseURL: 'https://learnandedu.com/api',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});
export const checkForUnauthorizedResponse = (error, dispatch) => {
  if (error?.response?.status === 401) {
    dispatch(clearStore());
    return toast.error('Unauthorized! Logging Out...');
  }
  return toast.error(error?.response?.data?.message || error?.message);
};
export default customFetch;
