import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { Carousel, InputField } from '../components';
import Logo from '../assets/logo- tusk up.svg';
import Wave from '../assets/icon - wave.svg';
import iconEye from '../assets/icon - eye.svg';
import iconEyeHide from '../assets/icon - eyelash - hide.svg';
import iconCheck from '../assets/Icon - Check.svg';
import iconUnCheck from '../assets/Icon - Uncheck.svg';
import bgImage from '../assets/Background_image_onboarding screens (1).svg';
import { LuEyeOff } from 'react-icons/lu';
import { addUserToLocalStorage } from '../utils/localStorage';

export default function Register() {
  const [values, setValues] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [eyeClicked, setEyeClicked] = useState(false);
  const passwordRef = useRef(null);
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
    mutate: loginUserM,
    data: userDataLogin,
    isLoading,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await customFetch.post(
        '/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data.data;
    },
    onSuccess: (data) => {
      dispatch(
        loginUser({
          token: data.accessToken.token,
          ...data,
        })
      );

      navigate('/');
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
  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      // || (!isMember && !name)
      toast.error('من فضلك أدخل جميع الحقول');
      return;
    }
    loginUserM({ email, password });
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

  return (
    <div className='min-h-screen bg-[#f0f4f8] grid place-items-center'>
      <div className=' min-h-[80vh] w-[90vw] mx-auto grid place-items-center'>
        <div className='bg-base-100  grid  lg:grid-cols-2  h-full rounded-tl-[75px] rounded-br-[42px] rounded-tr-[75px]  '>
          {/* Form */}
          <div className=' self-center px-5 sm:px-14 py-4 sm:py-10 '>
            <div className='flex justify-center mb-3'>
              <img src={Logo} alt='logo' />
            </div>
            <form
              className='flex flex-col shadow-lg rounded-[24px] gap-5 py-5 sm:py-16 px-3 sm:px-5 bg-[#F6F6F6]'
              onSubmit={onSubmit}
            >
              <div className='flex gap-2 items-center self-center'>
                <h2 className='text-lg font-bold'>
                  مرحبا، سجّل دخولك للمتابعة
                </h2>
                <img
                  src={Wave}
                  alt='wave icon'
                  className='w-[30px] h-[30px] object-contain'
                />
              </div>
              <InputField
                labelText='البريد الالكتروني'
                placeHolder='example@domain.com'
                type='email'
                name='email'
                handleChange={handleChange}
                autoComplete='email'
              />
              <div className='relative'>
                <InputField
                  labelText='كلمة المرور'
                  placeHolder='**********'
                  type='password'
                  name='password'
                  handleChange={handleChange}
                  autoComplete='current-password'
                  passwordRef={passwordRef}
                />
                {eyeClicked ? (
                  <img
                    src={iconEye}
                    alt='eye-icon'
                    className='absolute bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
                    onClick={handleEyeLogic}
                  />
                ) : (
                  <img
                    src={iconEyeHide}
                    alt='eye-icon'
                    className='absolute bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
                    onClick={handleEyeLogic}
                  />
                )}
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-2 cursor-pointer'>
                  {rememberMe ? (
                    <img
                      src={iconCheck}
                      alt='check'
                      className='w-[24px] h-[24px] '
                      onClick={() => setRememberMe((prev) => !prev)}
                    />
                  ) : (
                    <img
                      src={iconUnCheck}
                      alt='check'
                      className='w-[24px] h-[24px] '
                      onClick={() => setRememberMe((prev) => !prev)}
                    />
                  )}
                  <span
                    className='text-lg'
                    onClick={() => setRememberMe((prev) => !prev)}
                  >
                    تذكرني
                  </span>
                </div>

                <Link to='/forget-password' className='underline text-lg'>
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <button
                type='submit'
                className='btn btn-primary text-primary-content text-lg'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='loading loading-spinner'></span>
                ) : (
                  'تسجيل دخول'
                )}
              </button>
            </form>
          </div>
          {/* Slider */}
          <div
            className='grid place-items-center rounded-tl-[42px] rounded-br-[75px]  '
            style={{
              backgroundImage: `url('${bgImage}')`,
              backgroundSize: 'cover',
            }}
          >
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}
