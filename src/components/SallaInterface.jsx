import React, { useState } from 'react';
import { IoIosAlert } from 'react-icons/io';
import { FaGripHorizontal } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa';
import Products from './Products';
import Categories from './Categories';

export default function SallaInterface() {
  const [active, setActive] = useState('products');
  return (
    <div className='mt-5 sm:mt-10'>
      <h3 className='text-primary text-lg sm:text-xl font-semibold'>
        قسم واجهة السلة
      </h3>
      <div className='flex gap-2 items-center mt-3'>
        <IoIosAlert />
        <span className='text-gray-500'>يمكنك تفعيل بلاجن واحدة في الثيم</span>
      </div>
      <div className='grid sm:grid-cols-2 mt-5'>
        <label
          className={`flex py-10 cursor-pointer rounded-lg px-3 ${
            active === 'products' && 'bg-gray-300 border-b-2 border-b-primary'
          }`}
          htmlFor='products'
        >
          <input
            type='radio'
            name='radio-1'
            className='radio radio-primary'
            checked={active === 'products'}
            onChange={() => setActive('products')}
            id='products'
          />
          <div className='self-center flex flex-col gap-2 items-center w-full text-primary'>
            <FaGripHorizontal />
            <span className='font-bold'>المنتجات</span>
          </div>
        </label>
        <label
          className={`flex py-10 cursor-pointer rounded-lg px-3 ${
            active === 'categories' && 'bg-gray-300 border-b-2 border-b-primary'
          }`}
          htmlFor='categories'
        >
          <input
            type='radio'
            name='radio-1'
            className='radio radio-primary'
            checked={active === 'categories'}
            onChange={() => setActive('categories')}
            id='categories'
          />
          <div className='self-center flex flex-col gap-2 items-center w-full text-primary'>
            <FaStore />
            <span className='font-bold'>تصنيفات مع منتجاتها</span>
          </div>
        </label>
      </div>
      {active === 'products' ? <Products /> : <Categories />}
    </div>
  );
}
