import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { IoMdClose } from 'react-icons/io';

const ProductsPreview = ({
  openProductPreview,
  handleToggleProductPreview,
}) => {
  const modalClass = cn({
    'modal modal-middle ': true,
    'modal-open': openProductPreview,
  });

  return (
    <dialog id='product_modal' className={`${modalClass}`}>
      <div className='modal-box max-w-[82rem] h-[82rem] p-0 overflow-hidden'>
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
        <h3>ahmed is here</h3>
      </div>
    </dialog>
  );
};

export default ProductsPreview;
