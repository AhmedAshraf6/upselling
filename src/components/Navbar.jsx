import React, { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import Wave from '../assets/icon - wave.svg';
import arrowImg from '../assets/chevron-down.svg';
import userImg from '../assets/user.svg';

import { useDispatch, useSelector } from 'react-redux';
import { clearStore, toggleSidebar } from '../features/user/userSlice';
import { Link, NavLink } from 'react-router-dom';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { useMutation } from '@tanstack/react-query';
const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const { mutate: logoutUser, isLoading } = useMutation({
    mutationFn: async () => {
      await customFetch.post('/logout');
    },
    onSuccess: () => {
      dispatch(clearStore('تم تسجيل خروجك ...'));
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return (
    <nav className='navbar flex justify-between flex-wrap sm:flex-nowrap items-center bg-base-100 mb-3 sm:mb-5 py-3 sm:py-5 px-5 sm:px-16 rounded-xl'>
      <div>
        <Link to='/' className='flex gap-1 sm:gap-3'>
          <Logo />
          <div className='flex gap-2 items-center self-center'>
            <h2 className='text-sm sm:text-lg font-bold'>
              اهلا بك، في تاسك اب
            </h2>
            <img
              src={Wave}
              alt='wave icon'
              className='w-[30px] h-[30px] object-contain'
            />
          </div>
        </Link>
      </div>
      {/* <div className='relative'>
        <div
          className='flex items-center text-primary transition duration-200 text-sm sm:text-lg gap-2 cursor-pointer'
          onClick={() => setClicked((prev) => !prev)}
        >
          <FaUserCircle />
          <FaCaretDown />
          {clicked && (
            <div
              className='absolute bg-base-100 rounded-xl top-12 w-full h-full left-0 text-primary flex items-center justify-center font-bold'
              onClick={logoutUser}
            >
              Logout
            </div>
          )}
        </div>
      </div> */}
      <div className='dropdown dropdown-bottom  '>
        <div tabIndex={0} role='button' className='flex gap-1 m-1'>
          <img src={userImg} alt='user' />
          <img src={arrowImg} alt='arrow' />
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-primary'
        >
          <li className='hover:bg-[#F7F7F8] text-lg '>
            <Link to='profile' className='text-primary hover:text-primary '>
              حسابي
            </Link>
          </li>
          <li className='hover:bg-[#F7F7F8] text-lg '>
            <span
              onClick={logoutUser}
              className='text-primary hover:text-primary active:text-primary focus:text-primary'
            >
              تسجيل الخروج
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
