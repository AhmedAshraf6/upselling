import React from 'react';
import { Link } from 'react-router-dom';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export default function FormReSendPassword({ email }) {
  const dispatch = useDispatch();
  // React query
  const { mutate: ForgetPassword, isLoading: isLoadingResend } = useMutation({
    mutationFn: async ({ email }) => {
      const { data } = await customFetch.post(
        '/forgot-password',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return (
    <div className='flex flex-col shadow-lg rounded-[24px] gap-5 py-5 sm:py-28 px-3 sm:px-5 bg-[#F6F6F6]'>
      <div className='flex gap-2 items-center self-center'>
        <div>
          <h2 className='text-lg font-bold inline text-black'>
            تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
          </h2>
          <span className='text-primary font-bold mx-2'>{email}</span>
        </div>
      </div>
      <p className='font-light'>
        يرجى التحقق من بريدك الإلكتروني لإكمال العملية
      </p>
      <div className='flex justify-center items-center gap-1 text-primary'>
        <span>لم يصلك؟</span>
        <button
          type='button'
          className='underline text-lg font-semibold underline-offset-4'
          onClick={() => ForgetPassword({ email })}
        >
          {isLoadingResend ? (
            <span className='loading loading-spinner'></span>
          ) : (
            'أعادة إرسال'
          )}
        </button>
      </div>
      <Link
        to='/register'
        className='btn btn-primary text-primary-content text-lg'
      >
        الرجوع لصفحة الدخول
      </Link>
    </div>
  );
}
