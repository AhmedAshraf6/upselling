import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css';
// images
import img1 from '../assets/IMG 1.svg';
import img2 from '../assets/IMG 2.svg';
import img3 from '../assets/IMG 3.svg';
import rec from '../assets/Rectangle 7083.svg';
import recActive from '../assets/Rectangleactive.svg';
export default function Carousel() {
  return (
    <Swiper
      dir='ltr'
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={'auto'}
      pagination={{ clickable: true }}
      speed={2000}
      // centeredSlides={true}
      className='h-[400px] text-base-100 text-center overflow-hidden'
    >
      <SwiperSlide>
        <img
          src={img1}
          alt='image'
          className='w-[400px] md:w-auto h-auto object-contain mx-auto'
          loading='lazy'
        />
        <h3 className=' text-center  mt-5 sm:mt-5 text-xl'>
          تاسك اب - شريكك في نجاح متجرك الإلكتروني <br />
          مع بلجن تسويقية تحقق النتائج مذهله
        </h3>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={img3}
          alt='image'
          className='w-[400px] md:w-auto h-auto object-contain mx-auto'
          loading='lazy'
        />
        <h3 className='text-center mt-5 sm:mt-5 text-xl'>
          نوفر لك تقارير تفصيلية ومحدثة بشكل مستمر لتتبع
          <br />
          الاضافات الجديدة في السلة بالإحصائيات والأرقام
        </h3>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={img2}
          alt='image'
          className='w-[400px] md:w-auto h-auto object-contain mx-auto'
          loading='lazy'
        />
        <h3 className='text-center mt-5 sm:mt-5 text-xl'>
          ضاعف ارباحك و زيد مبيعاتك في <br />
          متجرك بفكرة تسويقية ذكية
        </h3>
      </SwiperSlide>
    </Swiper>
  );
}
