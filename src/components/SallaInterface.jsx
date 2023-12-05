import React, { useState } from 'react';
import { IoIosAlert } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { BiStoreAlt } from 'react-icons/bi';
import Products from './Products';
import Categories from './Categories';
import productsvg from '../assets/icons/iconMenu.svg';
import categorysvg from '../assets/icons/icon-Shop.svg';
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
      <div className='grid sm:grid-cols-2 mt-5 gap-3' dir='rtl'>
        <div
          className={`flex justify-between items-center py-8 cursor-pointer rounded-lg px-4 border-2 border-primary text-primary ${
            active === 'products' &&
            'bg-primary border-b-2 border-b-primary text-white'
          }`}
          onClick={(e) => {
            if (!e.target.classList.contains('toggle')) {
              setActive('products');
            }
          }}
        >
          <input type='checkbox' className='toggle toggle-primary h-5' />
          <div className='flex gap-2 items-center '>
            <img src={productsvg} alt='' />
            <span className='font-bold'>المنتجات</span>
          </div>
          <div className='avatar placeholder'>
            <div
              className={`${
                active === 'products'
                  ? 'bg-base-100 text-primary'
                  : 'bg-primary text-white'
              }  rounded-full w-6`}
            >
              <span className='text-xs'>
                <FaCheck />
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flex justify-between items-center py-8 cursor-pointer rounded-lg px-4 border-2 border-primary text-primary ${
            active === 'categories' &&
            'bg-primary border-b-2 border-b-primary text-white'
          }`}
          onClick={(e) => {
            if (!e.target.classList.contains('toggle')) {
              setActive('categories');
            }
          }}
        >
          <input type='checkbox' className='toggle toggle-primary h-5' />
          <div className='flex gap-2 items-center '>
            <BiStoreAlt className='text-3xl' />
            <span className='font-bold'>تصنيفات مع منتجاتها</span>
          </div>
          <div className='avatar placeholder'>
            <div
              className={`${
                active === 'categories'
                  ? 'bg-base-100 text-primary'
                  : 'bg-primary text-white'
              }  rounded-full w-6`}
            >
              <span className='text-xs'>
                <FaCheck />
              </span>
            </div>
          </div>
        </div>
      </div>
      {active === 'products' ? <Products /> : <Categories />}
    </div>
  );
}
