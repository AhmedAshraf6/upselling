import React from 'react';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import store from '../assets/images/store.png';
import { CiUser } from 'react-icons/ci';

import NavLinks from './NavLinks';
import { Link } from 'react-router-dom';
const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <aside
      className={`hidden min-h-screen lg:flex flex-col gap-y-6 col-span-1 self-start px-4 sm:px-4 py-4  ${
        isSidebarOpen && '!hidden'
      }`}
    >
      <div className='h-[36px] w-full'>
        <Link to='/' className='flex gap-1 items-center'>
          <Logo />
          <div className='flex flex-col text-sm font-semibold'>
            <h6>عناقيد التطبيقات</h6>
            <span>Apps Bunches</span>
          </div>
        </Link>
      </div>
      <div className=' bg-[#f7f7f8] rounded-lg py-4'>
        <div className='flex gap-2'>
          <img src={store} alt='store' />
          <h2 className='text-[18px] font-bold text-black'>متجر ناف</h2>
        </div>
        <div className='flex gap-2 mt-2'>
          <div className='flex items-center gao-1 rounded-2xl border-[1px] border-base-300 cursor-pointer px-1'>
            <CiUser />
            <span className='text-black font-bold'> حمل ios</span>
          </div>
          <div className='flex items-center gao-1 rounded-2xl border-[1px] border-base-300 cursor-pointer px-1'>
            <CiUser />
            <span className='text-black font-bold'> حمل أندرويد</span>
          </div>
        </div>
      </div>
      <NavLinks />
    </aside>
  );
};

export default BigSidebar;
