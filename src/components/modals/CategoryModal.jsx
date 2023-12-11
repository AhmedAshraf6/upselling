import React, { useState } from 'react';

import cn from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

const CategoryModal = ({
  open,
  handleToggle,
  newCategories,
  setNewCategories,
}) => {
  const modalClass = cn({
    'modal modal-middle ': true,
    'modal-open': open,
  });
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [categoriesFromSearch, setCategoriesFromSearch] = useState([]);

  const queryClient = useQueryClient();
  const { isLoading: isLoadingFetchCategories, data: categories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      const { data } = await customFetch('/get-categories');
      return data.data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });

  const [tempCategoriesAdded, setTempCategoriesAdded] = useState(newCategories);
  const handleChange = (category) => {
    const isSelected = tempCategoriesAdded.some(
      (item) => item.id === category.id
    );
    if (isSelected) {
      setTempCategoriesAdded(
        tempCategoriesAdded.filter((item) => item.id !== category.id)
      );
    } else {
      setTempCategoriesAdded([...tempCategoriesAdded, category]);
    }
  };

  const handleAddToSala = () => {
    if (tempCategoriesAdded.length === 0) {
      // toast.error('من فضلك أضف بعض المنتجات');
      return;
    }

    setNewCategories(tempCategoriesAdded);
    handleToggle();
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    // Call a function to perform search whenever the input changes
    performSearch(event.target.value);
  };
  // Function to perform search based on the input value
  const performSearch = (query) => {
    const filteredData = categories.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setCategoriesFromSearch(filteredData);
  };
  return (
    <dialog id='product_modal' className={`${modalClass}`}>
      <div className='modal-box max-w-[82rem] h-[82rem] p-0 overflow-hidden'>
        <form
          method='dialog'
          className='flex justify-between items-center bg-[#F5F7F7] py-2 px-5'
        >
          <h3 className='text-base sm:text-lg font-semibold '>
            اضافة تصنيف في واجة السلة
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
                onChange={handleSearchChange}
              />
            </div>
            <FaSearch
              type='submit'
              className='text-lg text-primary absolute top-2 sm:top-4 left-5'
            />
          </div>
          {tempCategoriesAdded.length === 2 && (
            <div className='flex gap-2 items-center mt-3 text-[#EAA900] text-base sm:text-lg font-bold'>
              <IoAlertCircleOutline className='text-2xl' />
              <span className=''>
                لقد وصلت للحد الاقصى لإضافة التصنيفات في السلة
              </span>
            </div>
          )}
          {/* items */}
          <div className='flex flex-col gap-3 h-[75vh] overflow-y-auto'>
            {isLoadingFetchCategories ? (
              <span className='loading loading-dots loading-lg mx-auto block'></span>
            ) : categories?.length === 0 ? (
              <h3 className='text-center text-lg font-semibold'>
                لا يوجد تصنيفات
              </h3>
            ) : search ? (
              categoriesFromSearch?.length === 0 ? (
                <h3 className='text-center text-lg font-semibold'>
                  لا يوجد تصنيفات
                </h3>
              ) : (
                categoriesFromSearch?.map((category) => {
                  const isSelected = tempCategoriesAdded.some(
                    (item) => item.id === category.id
                  );
                  return (
                    <label
                      className={`custom-radio flex justify-between py-2 sm:py-4 cursor-pointer rounded-lg px-3 border-[1px] border-gray-200`}
                      htmlFor={category.id}
                      key={category.id}
                    >
                      <div className='flex gap-2'>
                        <input
                          type='checkbox'
                          name='radio-1'
                          className='radio radio-primary self-center '
                          id={category.id}
                          value={category}
                          checked={isSelected}
                          onClick={() => handleChange(category)}
                          readOnly
                          disabled={
                            !isSelected && tempCategoriesAdded.length === 2
                          }
                        />
                        <div className='flex gap-2'>
                          <img
                            src={category?.image}
                            alt='image'
                            className='w-24 h-24 '
                          />
                          <div className='flex flex-col'>
                            <h4 className='text-lg font-semibold'>
                              {category.names.ar}
                            </h4>

                            <span className='text-sm text-gray-400 font-semibold '>
                              {category.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })
              )
            ) : (
              categories?.map((category) => {
                const isSelected = tempCategoriesAdded.some(
                  (item) => item.id === category.id
                );
                return (
                  <label
                    className={`custom-radio flex justify-between py-2 sm:py-4 cursor-pointer rounded-lg px-3 border-[1px] border-gray-200`}
                    htmlFor={category.id}
                    key={category.id}
                  >
                    <div className='flex gap-2'>
                      <input
                        type='checkbox'
                        name='radio-1'
                        className='radio radio-primary self-center '
                        id={category.id}
                        value={category}
                        checked={isSelected}
                        onClick={() => handleChange(category)}
                        readOnly
                        disabled={
                          !isSelected && tempCategoriesAdded.length === 2
                        }
                      />
                      <div className='flex gap-2'>
                        <img
                          src={category?.image}
                          alt='image'
                          className='w-24 h-24 '
                        />
                        <div className='flex flex-col'>
                          <h4 className='text-lg font-semibold'>
                            {category?.name}
                          </h4>

                          {category?.sale_price?.amount && (
                            <h2 className='text-sm text-gray-400 font-semibold line-through'>
                              <span> {category?.price?.currency} </span>
                              <span> {category?.price?.amount} </span>
                            </h2>
                          )}
                          <h2 className='text-sm text-error font-semibold'>
                            <span> {category?.sale_price?.currency} </span>
                            <span>
                              {category?.sale_price?.amount
                                ? category?.sale_price?.amount
                                : category?.price?.amount}
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
              disabled={tempCategoriesAdded.length > 2}
            >
              اضافة التصنيفات للسلة
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CategoryModal;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
