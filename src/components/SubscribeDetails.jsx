import React from 'react';

export default function SubscribeDetails({ data }) {
  return (
    <div className='flex justify-between gap-3 flex-wrap rounded-xl shadow-lg mt-2 sm:mt-4 px-4 py-3 border-[1px] border-[#E1E2E2]'>
      <div className='flex flex-col gap-2'>
        <h4 className='text-grayColor text-xs sm:text-sm text-center'>
          نوع الباقة
        </h4>
        <h3 className='text-lg sm:text-xl text-primary font-bold'>
          {data?.store?.subscription_plane?.name}
        </h3>
      </div>
      <div className='flex flex-col gap-2'>
        <h4 className='text-grayColor text-xs sm:text-sm text-center'>
          تفاصيل الاشتراك
        </h4>
        <h3 className='text-lg sm:text-xl text-primary font-bold'>
          تفاصيل الاشتراك
        </h3>
      </div>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-2'>
          <h4 className='text-grayColor text-xs sm:text-sm text-center'>
            تاريخ الاشتراك
          </h4>
          <h3 className='text-lg sm:text-xl text-primary font-bold'>
            {data?.store?.subscription_plane?.start_date &&
              data.store.subscription_plane.start_date.split(' ')[0]}
          </h3>
        </div>
        <div className='flex flex-col gap-2'>
          <h4 className='text-grayColor text-xs sm:text-sm text-center'>
            تاريخ الانتهاء
          </h4>
          <h3 className='text-lg sm:text-xl text-[#00A79E] font-bold'>
            {data?.store?.subscription_plane?.end_date &&
              data.store.subscription_plane.end_date.split(' ')[0]}
          </h3>
        </div>
      </div>
    </div>
  );
}
