import React, { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { ProductModal } from './modals';
import { MdEdit } from 'react-icons/md';
import download from '../assets/download.jpg';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export default function Products() {
  const [open, setOpen] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isLoadingMyProducts, setIsloadingMyProducts] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // const { data: myProducts, isLoading: isLoadingMyProducts } = useQuery({
  //   queryKey: ['myProducts'],
  //   queryFn: async () => {
  //     const { data } = await customFetch('/products');
  //     return data.data;
  //   },
  //   onError: (error) => {
  //     checkForUnauthorizedResponse(error, dispatch);
  //   },
  // });
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
      setNewProducts(data.data);
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
    if (newProducts.length + myProducts.length === 0) {
      toast.error('لا يوجد منتجات لإضافتها');
      return;
    }
    addProducts(newProducts);
  };
  return (
    <div className='mt-3 sm:mt-5 bg-[#F7F7F8] rounded-md py-5 sm:py-10 px-3 '>
      {isLoadingMyProducts ? (
        <span className='loading loading-dots loading-lg mx-auto block'></span>
      ) : newProducts?.length === 0 ? (
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
            <button
              type='button'
              className='btn btn-sm text-primary bg-base-100'
              onClick={handleToggle}
            >
              تعديل
              <MdEdit />
            </button>
          </div>
          {/* items */}
          {/* max-h-[400px] overflow-y-auto  */}
          <div className='flex flex-col gap-3 mt-3 sm:mt-5'>
            {isLoadingMyProducts || isLoadingDeleteProduct ? (
              <span className='loading loading-dots loading-lg mx-auto block'></span>
            ) : (
              newProducts?.map((product) => (
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
                    <div className='flex flex-col'>
                      <h4 className='text-lg font-semibold'>
                        {product.name.ar}
                      </h4>

                      {product?.sale_price?.amount && (
                        <span className='text-sm text-gray-400 font-semibold line-through'>
                          {product.price.amount}
                          {product.price.currency}
                        </span>
                      )}
                      <span className='text-sm text-error font-semibold'>
                        {product?.sale_price?.amount
                          ? product?.sale_price?.amount
                          : product.price.amount}
                        {product.price.currency}
                      </span>
                    </div>
                  </div>
                  {/* <button onClick={() => deleteProduct(product)} type='button'>
                    <MdDelete className='text-xl' />
                  </button> */}
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
          newProducts={newProducts}
          setNewProducts={setNewProducts}
        />
      )}
    </div>
  );
}
