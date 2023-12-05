import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { FaSearch } from 'react-icons/fa';
import download from '../../assets/download.jpg';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

const ProductModal = ({
  open,
  handleToggle,
  myProducts,
  newProducts,
  setNewProducts,
}) => {
  const modalClass = cn({
    'modal modal-middle ': true,
    'modal-open': open,
  });
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { isLoading: isLoadingFetchProducts, data: products } = useQuery({
    queryKey: ['allProducts', search],
    queryFn: async () => {
      const { data } = await customFetch(`/get-products?name=${search}`);
      return data.data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  // const [isLoadingFetchProducts, setIsLoadingFetchProducts] = useState(false);
  // const [products, setProducts] = useState([]);
  // const fetchProducts = async () => {
  //   setIsLoadingFetchProducts(true);
  //   try {
  //     const { data } = await customFetch('/get-products');
  //     setProducts(data.data);
  //     setIsLoadingFetchProducts(false);
  //   } catch (error) {
  //     checkForUnauthorizedResponse(error, dispatch);
  //     setIsLoadingFetchProducts(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const [tempProductsAdded, setTempProductsAdded] = useState(newProducts);
  const handleChange = (product) => {
    const isSelected = tempProductsAdded.some((item) => item.id === product.id);
    if (isSelected) {
      setTempProductsAdded(
        tempProductsAdded.filter((item) => item.id !== product.id)
      );
    } else {
      setTempProductsAdded([...tempProductsAdded, product]);
    }
  };

  const handleAddToSala = () => {
    if (tempProductsAdded.length === 0) {
      // toast.error('من فضلك أضف بعض المنتجات');
      return;
    }

    setNewProducts(tempProductsAdded);
    handleToggle();
  };
  console.log(tempProductsAdded);
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
          <button onClick={handleToggle}>
            <IoMdClose className='font-bold text-black text-lg' />
          </button>
        </form>
        <div className='flex flex-col gap-3 mt-3 sm:mt-5 px-5 sm:px-6'>
          {/* search */}
          <div className='relative'>
            <div className='form-control '>
              <input
                type='text'
                placeholder='بحث'
                className='input input-bordered input-sm sm:input-md rounded-3xl'
                name='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <FaSearch
              type='submit'
              className='text-lg text-primary absolute top-2 sm:top-4 left-5'
            />
          </div>
          {tempProductsAdded.length === 4 && (
            <div className='flex gap-2 items-center mt-3 text-[#EAA900] text-base sm:text-lg font-bold'>
              <IoAlertCircleOutline className='text-2xl' />
              <span className=''>
                لقد وصلت للحد الاقصى لإضافة المنتجات في السلة
              </span>
            </div>
          )}
          {/* items */}
          <div className='flex flex-col gap-3 h-[75vh] overflow-y-auto'>
            {isLoadingFetchProducts ? (
              <span className='loading loading-dots loading-lg mx-auto block'></span>
            ) : products?.length === 0 ? (
              <h3 className='text-center text-lg font-semibold'>
                لا يوجد منتجات
              </h3>
            ) : (
              products?.map((product) => {
                const isSelected = tempProductsAdded.some(
                  (item) => item.id === product.id
                );
                return (
                  <label
                    className={`flex justify-between py-2 sm:py-4 cursor-pointer rounded-lg px-3 border-[1px] border-gray-200`}
                    htmlFor={product.id}
                    key={product.id}
                  >
                    <div className='flex gap-2'>
                      <input
                        type='checkbox'
                        name='radio-1'
                        className='checkbox checkbox-primary self-center '
                        id={product.id}
                        value={product}
                        checked={isSelected}
                        onClick={() => handleChange(product)}
                        readOnly
                        disabled={!isSelected && tempProductsAdded.length === 4}
                      />
                      <div className='flex gap-2'>
                        <img
                          src={product?.main_image}
                          alt='image'
                          className='w-24 h-24 '
                        />
                        <div className='flex flex-col'>
                          <h4 className='text-lg font-semibold'>
                            {product.name.ar}
                          </h4>

                          {product?.sale_price?.amount && (
                            <h2 className='text-sm text-gray-400 font-semibold line-through'>
                              <span> {product.price.currency} </span>
                              <span> {product.price.amount} </span>
                            </h2>
                          )}
                          <h2 className='text-sm text-error font-semibold'>
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
                    {/* <MdDelete className='text-xl' /> */}
                  </label>
                );
              })
            )}
          </div>
          {/* button */}
          <div className='absolute bottom-[20px] left-[50%] -translate-x-[50%]'>
            <button
              className=' btn-primary btn-sm  rounded-3xl btn-wide md:w-[615px]'
              onClick={handleAddToSala}
              disabled={tempProductsAdded.length > 4}
            >
              اضافة المنتجات للسلة
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ProductModal;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
