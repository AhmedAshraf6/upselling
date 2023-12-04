import React, { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { CategoryModal } from './modals';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export default function Categories() {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: myCategories, isLoading: isLoadingMyCategories } = useQuery({
    queryKey: ['myCategories'],
    queryFn: async () => {
      const { data } = await customFetch('/categories');
      return data.data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });

  // handle delete product
  const { mutate: deleteCategoryFromDatabase, isLoadingDeleteCategory } =
    useMutation({
      mutationFn: async (categoryId) => {
        const { data } = await customFetch.delete(`/categories/${categoryId}`);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['myCategories'] });
        toast.info('تمت الازالة بنجاح');
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  const deleteCategory = (category) => {
    deleteCategoryFromDatabase(category?.id);
  };
  return (
    <div className='mt-3 sm:mt-5 bg-gray-300 rounded-md py-5 sm:py-10 px-3 '>
      {isLoadingMyCategories ? (
        <span className='loading loading-dots loading-lg mx-auto block'></span>
      ) : myCategories?.length === 0 ? (
        <div className='grid place-items-center'>
          <div
            className='flex flex-col gap-1 justify-center items-center bg-base-100 border-[1px] border-primary w-52 h-44 rounded-lg text-primary cursor-pointer hover:bg-primary transition duration-300 hover:text-base-100'
            onClick={handleToggle}
          >
            <IoMdAddCircleOutline className='text-2xl' />
            <span className='font-bold'>اضافة تصنيف</span>
          </div>
        </div>
      ) : (
        <form>
          {/* top */}
          <div className='flex justify-between items-center flex-wrap sm:flex-nowrap gap-3'>
            <h2 className='text-primary text-lg font-semibold'>
              التصنيفات المضافة في واجهة السلة
            </h2>
            <button
              type='button'
              className='btn btn-sm text-primary'
              onClick={handleToggle}
            >
              اضافة تصنيف
              <MdEdit />
            </button>
          </div>
          {/* items */}
          <div className='flex flex-col gap-3 max-h-[400px] overflow-y-auto mt-3 sm:mt-5'>
            {isLoadingMyCategories ? (
              <span className='loading loading-dots loading-lg mx-auto block'></span>
            ) : (
              myCategories?.map((category) => (
                <div
                  className={`flex justify-between py-2 sm:py-4 cursor-pointer rounded-lg px-3 border-[1px] border-gray-200`}
                  key={category.id}
                >
                  <div className='flex gap-3'>
                    <img src={category?.image} alt='' className='w-24 h-24 ' />
                    <div className='flex flex-col'>
                      <h4 className='text-lg font-semibold'>
                        {category.names.ar}
                      </h4>

                      <span className='text-sm text-gray-400 font-semibold line-through'>
                        {category.description}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCategory(category)}
                    type='button'
                  >
                    <MdDelete className='text-xl' />
                  </button>
                </div>
              ))
            )}
          </div>
        </form>
      )}
      {open && (
        <CategoryModal
          open={open}
          handleToggle={handleToggle}
          myCategories={myCategories}
        />
      )}
    </div>
  );
}
