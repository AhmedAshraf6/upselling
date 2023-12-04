import React from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

export default function StateItem({
  title,
  count,
  icon,
  color,
  bcg,
  border,
  countDesc,
  desc,
}) {
  return (
    <div
      className={`flex flex-col gap-3 items-center rounded-lg py-4 md:py-6 px-3 md:px-6 ${bcg} border-2 ${border}`}
    >
      <div className='flex items-center gap-2'>
        <img src={icon} alt='icon' />
        <h2 className='text-grayColor text-[18px]'>{title}</h2>
      </div>
      <div className='flex gap-1'>
        <span className={`text-3xl sm:text-5xl ${color} font-bold`}>
          {count}
        </span>
        <h2 className={`${color} text-lg self-end`}>{countDesc}</h2>
      </div>
      <div className='flex items-center gap-1'>
        <h3 className={`${color} font-bold text-sm`}>{desc}</h3>
        <IoAlertCircleOutline className='text-grayColor' />
      </div>
    </div>
  );
}
