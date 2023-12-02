import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { InputField } from '../components';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  // React query
  const {
    mutate: ForgetPassword,
    isLoading,
    isSuccess,
  } = useMutation({
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
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('من فضلك أدخل جميع الحقول');
      return;
    }
    ForgetPassword({ email });
  };

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-bgLight'>
      <div className='w-full max-w-md space-y-8 bg-light py-10 px-8 rounded-lg border-t-4 border-primary'>
        {isSuccess ? (
          <h3 className='text-center text-lg font-semibold'>
            تم ارسال رابط اعادة تعيين كلمة السر إلي بريدك الإلكرتوني
          </h3>
        ) : (
          <div>
            <div>
              <h2 className='mt-3 sm:mt-6 text-center text-xl sm:text-2xl font-semibold tracking-tight text-dark'>
                أدخل البريد الإلكتروني لإرسال رمز التأكيد
              </h2>
            </div>
            <form
              className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5'
              onSubmit={onSubmit}
            >
              <InputField
                placeHolder='البريد الالكتروني'
                type='email'
                name='email'
                value={email}
                handleChange={handleChange}
              />

              <button
                type='submit'
                className='btn btn-primary text-primary-content'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='loading loading-spinner'></span>
                ) : (
                  'إرسال'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
