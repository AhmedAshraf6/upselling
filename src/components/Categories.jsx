import React, { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { CategoryModal } from './modals';
import { MdEdit } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [myCategories, setMyCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [isLoadingMyCategories, setIsLoadingMyCategories] = useState(false);
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
  const { mutate: addCategories, isLoading: isLoadingAddCategories } =
    useMutation({
      mutationFn: async (categories) => {
        console.log(categories);
        const { data } = await customFetch.post('/categories', {
          categories: categories,
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
  const fetchMyCategories = async () => {
    setIsLoadingMyCategories(true);
    try {
      const { data } = await customFetch('/categories');
      setMyCategories(data.data);
      setNewCategories(data.data);
      setIsLoadingMyCategories(false);
    } catch (error) {
      checkForUnauthorizedResponse(error, dispatch);
      setIsLoadingMyCategories(false);
    }
  };
  useEffect(() => {
    fetchMyCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategories.length + myCategories.length === 0) {
      toast.error('لا يوجد تصنيفات لإضافتها');
      return;
    }
    addCategories(newCategories);
  };
  console.log(newCategories);
  return (
    <div className='mt-3 sm:mt-5 bg-[#F7F7F8] rounded-md py-5 sm:py-10 px-3 '>
      {isLoadingMyCategories ? (
        <span className='loading loading-dots loading-lg mx-auto block'></span>
      ) : newCategories?.length === 0 ? (
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
        <form onSubmit={handleSubmit}>
          {/* top */}
          <div className='flex justify-between items-center flex-wrap sm:flex-nowrap gap-3'>
            <h2 className='text-primary text-lg font-semibold'>
              التصنيفات المضافة في واجهة السلة
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
            {isLoadingMyCategories ? (
              <span className='loading loading-dots loading-lg mx-auto block'></span>
            ) : (
              newCategories?.map((category) => (
                <div
                  className={`flex justify-between py-2 sm:py-4 cursor-pointer rounded-lg px-3 border-[1px] border-gray-200 bg-base-100`}
                  key={category.id}
                >
                  <div className='flex gap-3'>
                    <img src={category?.image} alt='' className='w-24 h-24 ' />
                    <div className='flex flex-col'>
                      <h4 className='text-lg font-semibold'>
                        {category?.name}
                      </h4>

                      {category?.sale_price?.amount && (
                        <span className='text-sm text-gray-400 font-semibold line-through'>
                          {category?.price?.amount}
                          {category?.price?.currency}
                        </span>
                      )}
                      <span className='text-sm text-error font-semibold'>
                        {category?.sale_price?.amount
                          ? category?.sale_price?.amount
                          : category?.price?.amount}
                        {category?.price?.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
            <button
              className='btn btn-primary self-end w-[205px]  rounded-[28px]'
              type='submit'
              disabled={isLoadingAddCategories}
            >
              {isLoadingAddCategories ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'حفظ'
              )}
            </button>
          </div>
        </form>
      )}
      {open && (
        <CategoryModal
          open={open}
          handleToggle={handleToggle}
          myCategories={myCategories}
          newCategories={newCategories}
          setNewCategories={setNewCategories}
        />
      )}
    </div>
  );
}
