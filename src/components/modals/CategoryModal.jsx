import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { FaSearch } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
const CategoryModal = ({ open, handleToggle, myCategories }) => {
  const modalClass = cn({
    'modal modal-middle': true,
    'modal-open': open,
  });
  const [search, setSearch] = useState('');
  const [categoriesFromSearch, setCategoriesFromSearch] = useState([]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingFetchCategories,
    data: categories,
    isFetching,
  } = useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      const { data } = await customFetch('/get-categories');
      return data.data;
    },
  });
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
  const [tempCategoriesAdded, setTempCategoriesAdded] = useState([]);
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

  // add Categories To sala
  const { mutate: addCategories, isLoading: isLoadingAddCategory } =
    useMutation({
      mutationFn: async (categoriesSend) => {
        console.log(categoriesSend);

        const { data } = await customFetch.post('/categories', {
          categories: categoriesSend,
        });
        return data;
      },
      onSuccess: () => {
        handleToggle();
        queryClient.invalidateQueries({ queryKey: ['myCategories'] });
        queryClient.invalidateQueries({ queryKey: ['allCategories'] });
        toast.success('added successfully');
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  const handleAddToSala = () => {
    if (tempCategoriesAdded.length === 0) {
      toast.error('من فضلك أضف بعض المنتجات');
      return;
    }
    if (tempCategoriesAdded.length + myCategories.length >= 3) {
      toast.error('يجب ان تكون التصنيفات المضافة أقل من 2 ');
      return;
    }
    addCategories(tempCategoriesAdded);
  };
  return (
    <dialog id='category_modal' className={modalClass}>
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
          اضافة تصنيف في واجة السلة
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
                onChange={handleSearchChange}
              />
            </div>
            <FaSearch
              type='submit'
              className='text-lg text-base-content absolute top-2 sm:top-3 left-5'
            />
          </div>
          {/* items */}
          <div className='flex flex-col gap-3 h-[400px] overflow-y-auto'>
            {isLoadingFetchCategories || isFetching ? (
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
                  return (
                    <label
                      className={`flex justify-between py-2 sm:py-4 cursor-pointer rounded-lg px-3 border-[1px] border-gray-200`}
                      htmlFor={category.id}
                      key={category.id}
                    >
                      <div className='flex gap-2'>
                        <input
                          type='checkbox'
                          name='radio-1'
                          className='checkbox checkbox-primary self-center '
                          id={category.id}
                          value={category}
                          checked={tempCategoriesAdded.some(
                            (item) => item.id === category.id
                          )}
                          onClick={() => handleChange(category)}
                          readOnly
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
                return (
                  <label
                    className={`flex justify-between py-2 sm:py-4 cursor-pointer rounded-lg px-3 border-[1px] border-gray-200`}
                    htmlFor={category.id}
                    key={category.id}
                  >
                    <div className='flex gap-2'>
                      <input
                        type='checkbox'
                        name='radio-1'
                        className='checkbox checkbox-primary self-center '
                        id={category.id}
                        value={category}
                        checked={tempCategoriesAdded.some(
                          (item) => item.id === category.id
                        )}
                        onClick={() => handleChange(category)}
                        readOnly
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
            )}
          </div>
          {/* button */}
          <button
            className='btn btn-primary btn-sm'
            onClick={handleAddToSala}
            disabled={isLoadingAddCategory}
          >
            اضافة التصنيفات للسلة
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CategoryModal;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
