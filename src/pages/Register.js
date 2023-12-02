import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { InputField } from '../components';

export default function Register() {
  const [values, setValues] = useState({});
  // const [formData, setFormData] = useState(new FormData());

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
          // isAdmin: data.user.role.id == 1 && true,
          ...data,
        })
      );
      toast.success('login successfully');
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

    // const { name, value } = event.target;
    // formData.set(name, value);
  };
  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      // || (!isMember && !name)
      toast.error('Please Fill Out All Fields');
      return;
    }
    loginUserM({ email, password });
    // if (isMember) {
    //   return;
    // }
    // toast.error('register not working in current time');
    // dispatch(registerUser({ name, email, password }));
  };
  // const toggleMember = () => {
  //   setValues({ ...values, isMember: !values.isMember });
  // };
  // console.log( );
  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-bgLight'>
      <div className='w-full max-w-md space-y-8 bg-light  py-10  px-8 rounded-lg border-t-4 border-primary'>
        <div>
          <h2 className='mt-3 sm:mt-6 text-center text-xl sm:text-3xl font-bold tracking-tight text-dark'>
            {/* {!values.isMember ? 'تسجيل حساب' : 'تسجيل دخول'} */}
            تسجيل دخول
          </h2>
        </div>
        <form
          className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5'
          onSubmit={onSubmit}
        >
          {/* {!values.isMember && (
            <InputField
              placeHolder='اسم المستخدم'
              type='email'
              name='username'
              handleChange={handleChange}
            />
          )} */}
          <InputField
            placeHolder='البريد الالكتروني'
            type='email'
            name='email'
            handleChange={handleChange}
          />
          <InputField
            placeHolder='كلمة السر'
            type='password'
            name='password'
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
              'تسجيل دخول'
            )}
          </button>
        </form>
        {/* <p className='text-lg text-center'>
          {values.isMember ? 'لست من الأعضاء؟' : 'بالفعل عضو؟'}

          <span
            className='text-primary text-xl cursor-pointer'
            onClick={toggleMember}
          >
            {values.isMember ? ' تسجيل حساب' : ' تسجيل دخول'}
          </span>
        </p> */}
        <div>
          <Link to='/forget-password' className='text-lg font-semibold'>
            هل نسيت كلمة السر ؟
          </Link>
        </div>
      </div>
    </div>
  );
}
