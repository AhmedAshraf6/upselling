import React from 'react';
import { Outlet } from 'react-router-dom';
import { BigSidebar, Navbar, SmallSidebar } from '../../components';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <main className='min-h-screen bg-[#f0f4f8] py-5 sm:py-10'>
      <div className='align-element'>
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;
