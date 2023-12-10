import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { InputField } from '../components';
import Logo from '../assets/logo- tusk up.svg';
import iconEye from '../assets/icon - eye.svg';
import iconEyeHide from '../assets/icon - eyelash - hide.svg';
export default function ResetPassword() {
  const [values, setValues] = useState({});
  const [eyeClicked, setEyeClicked] = useState(false);
  const [eyeClickedConfirmPassword, setEyeClickedConfirmPassword] =
    useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  // React query
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: async ({ password, password_confirmation, email, token }) => {
      const { data } = await customFetch.post(
        '/reset-password',
        { password, password_confirmation, email, token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data.data;
    },
    onSuccess: (data) => {
      toast.success('تم إعادة تعيين كلمة السر الخاص بك');
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
    const { password, password_confirmation } = values;
    if (!password || !password_confirmation) {
      toast.error('من فضلك أدخل جميع الحقول');
      return;
    }
    if (password !== password_confirmation) {
      toast.error('كلمةالسر يجب أن تكون متطابقتان');
      return;
    }
    resetPassword({ password, password_confirmation, email, token });
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
  // Handle Eye logic Confirm Password
  const handleEyeLogicConfirmPassword = () => {
    setEyeClickedConfirmPassword((prev) => !prev);
    if (confirmPasswordRef.current.type === 'text') {
      confirmPasswordRef.current.type = 'password';
    } else {
      confirmPasswordRef.current.type = 'text';
    }
  };

  return (
    <div className='min-h-screen bg-[#f0f4f8] grid place-items-center'>
      <div className='align-element-register h-[80vh] w-full sm:w-[80vw]'>
        <div className='bg-base-100 h-full rounded-[42px] w-full '>
          {/* Form */}
          <div className='max-w-xl  relative top-[50%] -translate-y-[50%] mx-auto  px-5 sm:px-14 py-4 sm:py-10'>
            <div className='flex justify-center mb-3'>
              <img src={Logo} alt='logo' />
            </div>
            <form
              className='flex flex-col shadow-lg rounded-[24px] gap-5 py-5 sm:py-16 px-3 sm:px-5 bg-[#F6F6F6]'
              onSubmit={onSubmit}
            >
              <div className='flex gap-2 items-center self-center'>
                <h2 className='text-lg font-bold'>إعادة تعيين كلمة السر</h2>
              </div>
              <div className='relative'>
                <InputField
                  labelText='كلمة المرور الجديدة'
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
                  labelText='تأكيد كلمة المرور'
                  placeHolder='**********'
                  type='password'
                  name='password_confirmation'
                  handleChange={handleChange}
                  autoComplete='current-password'
                  passwordRef={confirmPasswordRef}
                />
                {eyeClickedConfirmPassword ? (
                  <img
                    src={iconEye}
                    alt='eye-icon'
                    className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
                    onClick={handleEyeLogicConfirmPassword}
                  />
                ) : (
                  <img
                    src={iconEyeHide}
                    alt='eye-icon'
                    className='absolute bottom-1 sm:bottom-3 left-3 w-[24px] h-[24px] cursor-pointer'
                    onClick={handleEyeLogicConfirmPassword}
                  />
                )}
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-sm sm:btn-md text-primary-content text-lg'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='loading loading-spinner'></span>
                ) : (
                  'تأكيد'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
