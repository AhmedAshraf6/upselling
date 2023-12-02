import React from 'react';
import { Outlet } from 'react-router-dom';
import { BigSidebar, Navbar, SmallSidebar } from '../../components';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

const SharedLayout = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <main className='h-screen '>
      <SmallSidebar />
      <div className='grid grid-cols-5 '>
        <BigSidebar />
        <div
          className={` col-span-5  ${
            isSidebarOpen ? 'lg:col-span-5' : 'lg:col-span-4'
          }`}
        >
          <div className='px-4 sm:px-8 py-4'>
            <Navbar />
          </div>
          <div className='align-element'>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;
