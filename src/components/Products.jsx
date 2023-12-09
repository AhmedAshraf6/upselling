import React, { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { ProductModal, ProductsPreview } from './modals';
import { AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi2';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export default function Products() {
  const [open, setOpen] = useState(false);
  const [openProductPreview, setOpenProductPreview] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoadingMyProducts, setIsloadingMyProducts] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const handleToggleProductPreview = () =>
    setOpenProductPreview((prev) => !prev);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  // add Products To sala
  const { mutate: addProducts, isLoading: isLoadingAddProduct } = useMutation({
    mutationFn: async (products) => {
      const { data } = await customFetch.post('/products', {
        products: products,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('تمت الاضافة بنجاح');
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  const fetchMyProducts = async () => {
    setIsloadingMyProducts(true);
    try {
      const { data } = await customFetch('/products');
      setMyProducts(data.data);
      setIsloadingMyProducts(false);
    } catch (error) {
      checkForUnauthorizedResponse(error, dispatch);
      setIsloadingMyProducts(false);
    }
  };
  useEffect(() => {
    fetchMyProducts();
  }, []);

  // handle delete product
  const { mutate: deleteProductFromDatabase, isLoadingDeleteProduct } =
    useMutation({
      mutationFn: async (productId) => {
        const { data } = await customFetch.delete(`/products/${productId}`);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['myProducts'] });
        toast.info('تمت الازالة بنجاح');
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  const deleteProduct = (product) => {
    deleteProductFromDatabase(product?.id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (myProducts.length === 0) {
      toast.error('لا يوجد منتجات لإضافتها');
      return;
    }
    addProducts(myProducts);
  };
  return (
    <div className='mt-3 sm:mt-5 bg-[#F7F7F8] rounded-md py-5 sm:py-10 px-3 '>
      {isLoadingMyProducts ? (
        <span className='loading loading-dots loading-lg mx-auto block'></span>
      ) : myProducts?.length === 0 ? (
        <div className='grid place-items-center'>
          <div
            className='flex flex-col gap-1 justify-center items-center bg-base-100 border-[1px] border-primary w-52 h-44 rounded-lg text-primary cursor-pointer hover:bg-primary transition duration-300 hover:text-base-100'
            onClick={handleToggle}
          >
            <IoMdAddCircleOutline className='text-2xl' />
            <span className='font-bold'>اضافة منتج</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* top */}
          <div className='flex justify-between items-center flex-wrap sm:flex-nowrap gap-3'>
            <h2 className='text-primary text-lg font-semibold'>
              المنتجات المضافة في واجهة السلة
            </h2>
            <div className='flex gap-2'>
              <button
                type='button'
                className='btn btn-md text-primary bg-base-100 font-semibold'
                onClick={handleToggleProductPreview}
              >
                معاينة
                <HiOutlineEye className='text-lg' />
              </button>
              <button
                type='button'
                className='btn btn-md text-primary bg-base-100 font-semibold'
                onClick={handleToggle}
              >
                تعديل
                <AiOutlineEdit className='text-lg' />
              </button>
            </div>
          </div>
          {/* items */}
          {/* max-h-[400px] overflow-y-auto  */}
          <div className='flex flex-col gap-3 mt-3 sm:mt-5'>
            {isLoadingMyProducts || isLoadingDeleteProduct ? (
              <span className='loading loading-dots loading-lg mx-auto block'></span>
            ) : (
              myProducts?.map((product) => (
                <div
                  className={`flex justify-between py-2 sm:py-4 cursor-pointer rounded-lg px-3 border-[1px] border-gray-200 bg-base-100`}
                  key={product.id}
                >
                  <div className='flex gap-3'>
                    <img
                      src={product?.main_image}
                      alt=''
                      className='w-24 h-24 '
                    />
                    <div className='flex flex-col gap-1'>
                      <h4 className='text-lg font-semibold'>
                        {product.name.ar}
                      </h4>

                      {product?.sale_price?.amount && (
                        <h2 className='text-sm text-[#BDBDBD] font-semibold line-through'>
                          <span> {product.price.currency} </span>
                          <span> {product.price.amount} </span>
                        </h2>
                      )}
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
                    </div>
                  </div>
                </div>
              ))
            )}
            <button
              className='btn btn-primary self-end w-[205px]  rounded-[28px]'
              type='submit'
              disabled={isLoadingAddProduct}
            >
              {isLoadingAddProduct ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'حفظ'
              )}
            </button>
          </div>
        </form>
      )}
      {open && (
        <ProductModal
          open={open}
          handleToggle={handleToggle}
          myProducts={myProducts}
          setMyProducts={setMyProducts}
        />
      )}
      {openProductPreview && (
        <ProductsPreview
          openProductPreview={openProductPreview}
          handleToggleProductPreview={handleToggleProductPreview}
          myProducts={myProducts}
        />
      )}
    </div>
  );
}
