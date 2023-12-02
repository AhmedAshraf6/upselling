import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { InputField } from '../components';

export default function ResetPassword() {
  const [values, setValues] = useState({});
  const { email, token } = useParams();
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
  console.log(email, token);
  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-bgLight'>
      <div className='w-full max-w-md space-y-8 bg-light  py-10  px-8 rounded-lg border-t-4 border-primary'>
        <div>
          <h2 className='mt-3 sm:mt-6 text-center text-xl sm:text-3xl font-bold tracking-tight text-dark'>
            إعادة تعيين كلمة السر
          </h2>
        </div>
        <form
          className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5'
          onSubmit={onSubmit}
        >
          <InputField
            placeHolder='كلمة السر'
            type='password'
            name='password'
            handleChange={handleChange}
          />
          <InputField
            placeHolder='تأكيد كلمة السر'
            type='password'
            name='password_confirmation'
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
              'ارسال'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
