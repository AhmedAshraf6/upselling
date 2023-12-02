import React, { useState } from 'react';

import cn from 'classnames';
import { FaSearch } from 'react-icons/fa';
import download from '../../assets/download.jpg';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';

const ProductModal = ({ open, handleToggle, myProducts }) => {
  const modalClass = cn({
    'modal modal-middle': true,
    'modal-open': open,
  });
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingFetchProducts,
    data: products,
    isFetching,
  } = useQuery({
    queryKey: ['allProducts', search],
    queryFn: async () => {
      const { data } = await customFetch(`/get-products?name=${search}`);
      return data.data;
    },
  });

  const [tempProductsAdded, setTempProductsAdded] = useState([]);
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
  // add Products To sala
  const { mutate: addProducts, isLoading: isLoadingAddProduct } = useMutation({
    mutationFn: async (products) => {
      console.log(products);

      const { data } = await customFetch.post('/products', {
        products: products,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
      queryClient.invalidateQueries({ queryKey: ['allProducts'] });
      toast.success('added successfully');
      handleToggle();
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  const handleAddToSala = () => {
    if (tempProductsAdded.length === 0) {
      toast.error('من فضلك أضف بعض المنتجات');
      return;
    }
    if (tempProductsAdded.length + myProducts.length >= 5) {
      toast.error('يجب ان تكون المنتجات المضافة أقل من 4 ');
      return;
    }
    addProducts(tempProductsAdded);
  };

  return (
    <dialog id='product_modal' className={modalClass}>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={handleToggle}
          >
            ✕
          </button>
        </form>
        <h3 className='text-base sm:text-lg font-semibold mt-2'>
          اضافة منتج في واجة السلة
        </h3>

        <div className='flex flex-col gap-3 mt-3 sm:mt-5'>
          {/* search */}
          <div className='relative'>
            <div className='form-control '>
              <input
                type='text'
                placeholder='بحث'
                className='input input-bordered input-sm sm:input-md '
                name='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <FaSearch
              type='submit'
              className='text-lg text-base-content absolute top-2 sm:top-3 left-5'
            />
          </div>
          {/* items */}
          <div className='flex flex-col gap-3 h-[400px] overflow-y-auto'>
            {isLoadingFetchProducts || isFetching ? (
              <span className='loading loading-dots loading-lg mx-auto block'></span>
            ) : products?.length === 0 ? (
              <h3 className='text-center text-lg font-semibold'>
                لا يوجد منتجات
              </h3>
            ) : (
              products?.map((product) => {
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
                        checked={tempProductsAdded.some(
                          (item) => item.id === product.id
                        )}
                        onClick={() => handleChange(product)}
                        readOnly
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
          <button
            className='btn btn-primary btn-sm'
            onClick={handleAddToSala}
            disabled={isLoadingAddProduct}
          >
            اضافة المنتجات للسلة
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ProductModal;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
