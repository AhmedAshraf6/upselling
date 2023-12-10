import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import StateItem from './StatsItem';
import productimage from '../../assets/icons/icon-BagShop.svg';
import salaryImage from '../../assets/icons/icon-Dollar.svg';
import salaryImage2 from '../../assets/icons/Status - icon.svg';
import SubscribeDetails from '../SubscribeDetails';
export default function StatsContainer({ data, isLoadingProfile }) {
  const defaultStats = [
    {
      title: 'عدد المنتجات',
      count: data?.store?.analytics.products_count,
      countDesc: 'منتج',
      icon: productimage,
      color: 'text-[#6464DE]',
      border: 'border-[#6464DE]',
      bcg: 'bg-[#EFEFFB]',
      desc: 'إجمالي عدد المنتجات التي تم إضافتها للسلة',
    },
    {
      title: 'القيمة النقدية',
      count: data?.store?.analytics.cart_average_price.toFixed(2),
      countDesc: 'ر.س',
      icon: salaryImage,
      color: 'text-[#F0B213]',
      bcg: 'bg-[#FFF9E9]',
      border: 'border-[#F0B213]',
      desc: 'قيمة المنتجات التي أضيفت للسلة',
    },
    {
      title: 'القيمة النقدية',
      count: data?.store?.analytics.products_price,
      countDesc: 'ر.س',
      icon: salaryImage2,
      color: 'text-[#00A79E]',
      border: 'border-[#00A79E]',
      bcg: 'bg-[#D6F1EF]',
      desc: 'متوسط قيمة السلة',
    },
  ];

  return (
    <div>
      <h3 className='text-xl sm:text-2xl font-bold'>لوحة التحكم</h3>
      <h3 className='text-primary text-xs sm:text-sm  font-light'>
        تفاصيل الاشتراك
      </h3>
      <SubscribeDetails data={data} />
      <div className='mt-5 sm:mt-12'>
        <h2 className='text-primary font-bold text-[24px]'>الإحصائيات</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
          {defaultStats.map((item, index) => (
            <StateItem
              key={index}
              {...item}
              isLoadingProfile={isLoadingProfile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
