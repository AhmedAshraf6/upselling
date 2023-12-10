import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { IoMdClose } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
// image
import addToCart from '../../assets/add-to-cart-3046 1.svg';
import arrowLeft from '../../assets/Arrow - Left.svg';
import arrowRight from '../../assets/Arrow - Right.svg';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
const ProductsPreview = ({
  openProductPreview,
  handleToggleProductPreview,
  myProducts,
}) => {
  const modalClass = cn({
    'modal modal-middle ': true,
    'modal-open': openProductPreview,
  });

  return (
    <dialog id='product_modal' className={`${modalClass}`}>
      <div className='modal-box  max-w-[82rem] p-0 overflow-hidden'>
        <form
          method='dialog'
          className='flex justify-between items-center bg-[#F5F7F7] py-2 px-5'
        >
          <h3 className='text-base sm:text-lg font-semibold '>
            اضافة منتج في واجة السلة
          </h3>
          <button onClick={handleToggleProductPreview}>
            <IoMdClose className='font-bold text-black text-lg' />
          </button>
        </form>
        <div className=' h-full w-full flex justify-center items-center px-5 sm:px-10 py-24'>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            speed={1000}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              400: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className='w-full '
          >
            <div className='absolute inset-0 flex items-center justify-between z-10'>
              <div className='custom-prev cursor-pointer'>
                <img src={arrowRight} alt='' />
              </div>
              <div className='custom-next cursor-pointer '>
                <img src={arrowLeft} alt='' />
              </div>
            </div>
            {myProducts?.map((product, index) => (
              <SwiperSlide key={product.id}>
                <div className='flex flex-col gap-3 max-w-[256px] '>
                  <div className='bg-[#E1E2E2] max-w-[256px] h-48 sm:h-64 flex justify-center items-center  rounded-xl'>
                    <img
                      src={product.main_image}
                      alt='image'
                      className='max-h-full object-contain'
                    />
                  </div>
                  <h3 className='text-[#121212] font-light'>
                    {product.name.ar}
                  </h3>
                  <div className='flex items-center justify-between'>
                    {/* salary */}
                    <h2
                      className={`${
                        product?.sale_price?.amount
                          ? 'text-[#E80000] '
                          : 'text-primary'
                      } `}
                    >
                      <span> {product.sale_price.currency} </span>
                      <span>
                        {product?.sale_price?.amount
                          ? product?.sale_price?.amount
                          : product.price.amount}
                      </span>
                    </h2>
                    {product?.sale_price?.amount && (
                      <h2 className='text-sm text-[#BDBDBD] font-semibold line-through'>
                        <span> {product.price.currency} </span>
                        <span> {product.price.amount} </span>
                      </h2>
                    )}
                    {/* icon */}
                    <div className='avatar placeholder cursor-pointer'>
                      <div className='bg-[#E1E2E2] border-primary border-[1px] rounded-full w-10 p-2'>
                        <img src={addToCart} className='w-[24px] h-[24px]' />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </dialog>
  );
};

export default ProductsPreview;
// autoplay={{
//   delay: 3000,
//   disableOnInteraction: false,
// }}
