import React, { useRef, useState } from 'react';
import StatsContainer from '../../components/stats/StatsContainer';
import { useQuery } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import iconEye from '../../assets/icon - eye.svg';
import iconEyeHide from '../../assets/icon - eyelash - hide.svg';
import { InputField, SubscribeDetails } from '../../components';
export default function Profile() {
  const [values, setValues] = useState({});
  const [eyeClicked, setEyeClicked] = useState(false);
  const [eyeClickedNewPass, setEyeClickedNewPass] = useState(false);
  const [eyeClickedConfirmNewPass, setEyeClickedConfirmNewPass] =
    useState(false);

  // Refs
  const passwordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const dispatch = useDispatch();
  const { isLoading: isLoadingProfile, data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await customFetch('/profile');
      console.log(data.data);
      return data.data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  // Handle Change
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  // Handle Eye logic
  const handleEyeLogic = () => {
    setEyeClicked((prev) => !prev);
    if (passwordRef.current.type === 'text') {
      passwordRef.current.type = 'password';
    } else {
      passwordRef.current.type = 'text';
    }
  };
  const handleEyeLogicNewPass = () => {
    setEyeClickedNewPass((prev) => !prev);
    if (newPasswordRef.current.type === 'text') {
      newPasswordRef.current.type = 'password';
    } else {
      newPasswordRef.current.type = 'text';
    }
  };
  const handleEyeLogicConfirmNewPass = () => {
    setEyeClickedConfirmNewPass((prev) => !prev);
    if (confirmNewPasswordRef.current.type === 'text') {
      confirmNewPasswordRef.current.type = 'password';
    } else {
      confirmNewPasswordRef.current.type = 'text';
    }
  };
  return (
    <div
      className='bg-base-100 rounded-xl py-3 sm:py-5 px-5 sm:px-16 '
      style={{ minHeight: 'calc(100vh - 200px)' }}
    >
      <div>
        <h3 className='text-xl sm:text-2xl font-bold'>حسابي</h3>

        <SubscribeDetails data={data} />
      </div>
      <form className='bg-[#F6F6F6] flex flex-col gap-3 rounded-xl max-w-full sm:max-w-md mx-auto mt-5 sm:mt-8 py-5 sm:py-8 px-5 sm:px-8'>
        <h2 className='text-black text-base sm:text-lg font-bold'>
          تغيير كلمة المرور الحالية
        </h2>
        <div className='relative'>
          <InputField
            labelText='كلمة المرور الحالية'
            placeHolder='**********'
            type='password'
            name='password'
            handleChange={handleChange}
            passwordRef={passwordRef}
          />
          {eyeClicked ? (
            <img
              src={iconEye}
              alt='eye-icon'
              className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
              onClick={handleEyeLogic}
            />
          ) : (
            <img
              src={iconEyeHide}
              alt='eye-icon'
              className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
              onClick={handleEyeLogic}
            />
          )}
        </div>
        <div className='relative'>
          <InputField
            labelText='كلمة المرور الجديدة'
            placeHolder='**********'
            type='password'
            name='new_password'
            handleChange={handleChange}
            passwordRef={newPasswordRef}
          />
          {eyeClickedNewPass ? (
            <img
              src={iconEye}
              alt='eye-icon'
              className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
              onClick={handleEyeLogicNewPass}
            />
          ) : (
            <img
              src={iconEyeHide}
              alt='eye-icon'
              className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
              onClick={handleEyeLogicNewPass}
            />
          )}
        </div>
        <div className='relative'>
          <InputField
            labelText='تأكيد كلمة المرور الجديدة'
            placeHolder='**********'
            type='password'
            name='confirm_new_password'
            handleChange={handleChange}
            passwordRef={confirmNewPasswordRef}
          />
          {eyeClickedConfirmNewPass ? (
            <img
              src={iconEye}
              alt='eye-icon'
              className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
              onClick={handleEyeLogicConfirmNewPass}
            />
          ) : (
            <img
              src={iconEyeHide}
              alt='eye-icon'
              className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
              onClick={handleEyeLogicConfirmNewPass}
            />
          )}
        </div>
        <button
          type='submit'
          className='btn btn-sm sm:btn-md bg-grayColor hover:bg-grayColor text-base-100 text-lg mt-3 sm:mt-5'
        >
          تأكيد
        </button>
      </form>
    </div>
  );
}
