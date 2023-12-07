import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { FormReSendPassword, InputField } from '../components';
import Logo from '../assets/logo- tusk up.svg';
import mailImage from '../assets/Mail sent-rafiki (2) 1.svg';
import Typo from '../assets/Typing-bro 1.svg';
import bgImage from '../assets/Background_image_onboarding screens (1).svg';

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
    <div className='min-h-screen bg-[#f0f4f8] grid place-items-center'>
      <div className=' min-h-[80vh] w-[90vw] mx-auto grid place-items-center'>
        <div className='bg-base-100  grid w-full lg:grid-cols-2  h-full rounded-tl-[75px] rounded-br-[75px]  rounded-tr-[42px]'>
          {/* Form */}
          <div className=' self-center px-5 sm:px-14 py-4 sm:py-10'>
            <div className='flex justify-center mb-3'>
              <img src={Logo} alt='logo' />
            </div>
            {isSuccess ? (
              <FormReSendPassword
                email={email}
                ForgetPassword={ForgetPassword}
                isLoading={isLoading}
              />
            ) : (
              <form
                className='flex flex-col shadow-lg rounded-[24px] gap-5 py-5 sm:py-28 px-3 sm:px-5 bg-[#F6F6F6]'
                onSubmit={onSubmit}
              >
                <div className='flex gap-2 items-center self-center'>
                  <h2 className='text-lg font-bold'>
                    أدخل البريد الإلكتروني لإعادة كلمة المرور
                  </h2>
                </div>
                <InputField
                  labelText='البريد الالكتروني'
                  placeHolder='example@domain.com'
                  type='email'
                  name='email'
                  value={email}
                  handleChange={handleChange}
                  autoComplete='email'
                />

                <button
                  type='submit'
                  className='btn btn-primary text-primary-content text-lg'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className='loading loading-spinner'></span>
                  ) : (
                    'استمرار'
                  )}
                </button>
                <div className='flex justify-center items-center gap-1 text-primary'>
                  <span>لديك حساب؟</span>
                  <Link
                    to='/register'
                    className='underline text-lg font-semibold underline-offset-4'
                  >
                    تسجيل دخول
                  </Link>
                </div>
              </form>
            )}
          </div>
          {/* Slider */}
          <div
            className=' grid place-items-center rounded-tl-[42px] rounded-br-[75px] '
            style={{
              backgroundImage: `url('${bgImage}')`,
              backgroundSize: 'cover',
            }}
          >
            <img src={Typo} alt='mailImage' />
          </div>
        </div>
      </div>
    </div>
  );
}
