import React, { useState } from 'react';
import { IoIosAlert } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { BiStoreAlt } from 'react-icons/bi';
import Products from './Products';
import Categories from './Categories';
import productsvg from '../assets/icons/iconMenu.svg';
import categorysvg from '../assets/icons/icon-Shop.svg';
import toggleImgOFF from '../assets/icons/toggleOff.svg';
import toggleImgOnn from '../assets/icons/toggleOn.svg';
import toggleActive from '../assets/icons/toggleActive.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { useDispatch } from 'react-redux';
import SmallLoading from './SmallLoading';
import { toast } from 'react-toastify';
export default function SallaInterface({ data, isLoadingProfile }) {
  const [active, setActive] = useState('products');
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const { mutate: handleScriptStatus, isLoading: isLoadingScriptStatus } =
    useMutation({
      mutationFn: async (status) => {
        const { data } = await customFetch.post('/update-zid-script', {
          status,
        });
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  const { mutate: handlePopupSelection, isLoading: isLoadingPopupSelection } =
    useMutation({
      mutationFn: async ({ id, allowed_display_in_script }) => {
        const { data } = await customFetch.post('/update-content-zid-script', {
          id,
          allowed_display_in_script,
        });
        console.log(data);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  return (
    <div className='mt-5 sm:mt-10'>
      <div className='flex items-center gap-2'>
        <h3 className='text-primary text-lg sm:text-xl font-semibold'>
          قسم واجهة السلة
        </h3>
        {isLoadingScriptStatus || isLoadingProfile ? (
          <SmallLoading />
        ) : data?.store?.zid_script_status ? (
          <button
            onClick={() => handleScriptStatus(false)}
            disabled={isLoadingProfile || isLoadingScriptStatus}
            className={`${isLoadingScriptStatus && 'cursor-not-allowed'}`}
          >
            <img src={toggleImgOnn} alt='toggole on' className='toggleScript' />
          </button>
        ) : (
          <button
            onClick={() => handleScriptStatus(true)}
            disabled={isLoadingProfile || isLoadingScriptStatus}
            className={`${isLoadingScriptStatus && 'cursor-not-allowed'}`}
          >
            <img src={toggleImgOFF} alt='toggole on' className='toggleScript' />
          </button>
        )}
        {/* <input
          type='checkbox'
          className='toggle toggle-primary bg-[#707070] h-5'
          // checked={a === 'products'}
        /> */}
      </div>
      <div className='flex gap-2 items-center mt-3'>
        <IoIosAlert />
        <span className='text-gray-500'>يمكنك تفعيل بلاجن واحدة في الثيم</span>
      </div>
      <div className='grid sm:grid-cols-2 mt-5 gap-3'>
        <div
          className={`flex justify-between items-center py-8 cursor-pointer rounded-lg px-4 border-2 border-primary text-primary ${
            active === 'products' &&
            'bg-primary border-b-2 border-b-primary text-white'
          }`}
          onClick={(e) => {
            if (!e.target.classList.contains('toggleScript')) {
              setActive('products');
            }
          }}
        >
          {isLoadingPopupSelection ? (
            <SmallLoading txtColor='text-grayColor' />
          ) : data?.store?.subscription_plane?.allowed_display_in_script ===
            'products' ? (
            <button
              onClick={() =>
                handlePopupSelection({
                  id: data?.store?.subscription_plane?.id,
                  allowed_display_in_script: 'products',
                })
              }
              disabled={isLoadingProfile || isLoadingPopupSelection}
              className={`${
                isLoadingPopupSelection && 'cursor-not-allowed'
              } toggleScript `}
            >
              <img
                src={`${active === 'products' ? toggleActive : toggleImgOnn}`}
                alt='toggole on'
                className='toggleScript'
              />
            </button>
          ) : (
            <button
              onClick={() =>
                handlePopupSelection({
                  id: data?.store?.subscription_plane?.id,
                  allowed_display_in_script: 'products',
                })
              }
              disabled={isLoadingProfile || isLoadingPopupSelection}
              className={`${
                isLoadingPopupSelection && 'cursor-not-allowed'
              } toggleScript `}
            >
              <img
                src={toggleImgOFF}
                alt='toggole on'
                className='toggleScript'
              />
            </button>
          )}

          <div className='flex gap-2 items-center '>
            <img src={productsvg} alt='' />
            <span className='font-bold'>المنتجات</span>
          </div>
          <div>
            {data?.store?.subscription_plane?.allowed_display_in_script ===
              'products' && (
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
            )}
          </div>
        </div>
        <div
          className={`flex justify-between items-center py-8 cursor-pointer rounded-lg px-4 border-2 border-primary text-primary ${
            active === 'categories' &&
            'bg-primary border-b-2 border-b-primary text-white'
          }`}
          onClick={(e) => {
            if (!e.target.classList.contains('toggleScript')) {
              setActive('categories');
            }
          }}
        >
          {isLoadingPopupSelection ? (
            <SmallLoading txtColor='text-grayColor' />
          ) : data?.store?.subscription_plane?.allowed_display_in_script ===
            'categories' ? (
            <button
              onClick={() =>
                handlePopupSelection({
                  id: data?.store?.subscription_plane?.id,
                  allowed_display_in_script: 'categories',
                })
              }
              disabled={isLoadingProfile || isLoadingPopupSelection}
              className={`${
                isLoadingPopupSelection && 'cursor-not-allowed'
              } toggleScript `}
            >
              <img
                src={`${active === 'categories' ? toggleActive : toggleImgOnn}`}
                alt='toggole on'
                className='toggleScript'
              />
            </button>
          ) : (
            <button
              onClick={() =>
                handlePopupSelection({
                  id: data?.store?.subscription_plane?.id,
                  allowed_display_in_script: 'categories',
                })
              }
              disabled={isLoadingProfile || isLoadingPopupSelection}
              className={`${
                isLoadingPopupSelection && 'cursor-not-allowed'
              }  toggleScript `}
            >
              <img
                src={toggleImgOFF}
                alt='toggole on'
                className='toggleScript'
              />
            </button>
          )}
          <div className='flex gap-2 items-center '>
            <BiStoreAlt className='text-3xl' />
            <span className='font-bold'>تصنيفات مع منتجاتها</span>
          </div>
          <div>
            {data?.store?.subscription_plane?.allowed_display_in_script ===
              'categories' && (
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
            )}
          </div>
        </div>
      </div>
      {active === 'products' ? <Products /> : <Categories />}
    </div>
  );
}
