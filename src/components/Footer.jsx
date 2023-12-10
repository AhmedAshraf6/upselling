import React from 'react';
import phone from '../assets/Icon - Phone.svg';
import mail from '../assets/Icon - Message-5.svg';
import address from '../assets/Icon - map-marker.svg';
import logoCompany from '../assets/logoCompany.svg';
export default function Footer() {
  return (
    <div className='flex justify-between gap-4 flex-wrap w-[90vw] mx-auto my-3 sm:my-0'>
      <div className='flex items-center flex-wrap gap-2'>
        <span className='text-xs text-[#666]'>
          جميع الحقوق محفوظة لـ تاسك اب - 2023
        </span>
        <img src={logoCompany} alt='logoCompany' />
      </div>
      <div className='flex gap-3 flex-wrap'>
        <div className='flex gap-2 items-center'>
          <img src={address} alt='phone' />
          <span className='text-xs text-[#666]'>
            طريق الامام سعود بن عبد العزيز (مخرج 9), الرياض{' '}
          </span>
        </div>
        <div className='flex gap-2 items-center'>
          <img src={mail} alt='phone' />
          <span className='text-xs text-[#666]'>Apps@AppsBunches.com </span>
        </div>
        <div className='flex gap-2 items-center'>
          <img src={phone} alt='phone' />
          <span className='text-xs text-[#666]'>+966 532 331 339 </span>
        </div>
      </div>
    </div>
  );
}
