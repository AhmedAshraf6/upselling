import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import StateItem from './StatsItem';
import productimage from '../../assets/icons/icon-BagShop.svg';
import salaryImage from '../../assets/icons/icon-Dollar.svg';
import salaryImage2 from '../../assets/icons/icon-Cart.svg';
export default function StatsContainer() {
  const defaultStats = [
    {
      title: 'عدد المنتجات',
      count: 104,
      countDesc: 'منتج',
      icon: productimage,
      color: 'text-[#6464DE]',
      border: 'border-[#6464DE]',
      bcg: 'bg-white',
      desc: 'إجمالي عدد المنتجات التي تم إضافتها للسلة',
    },
    {
      title: 'القيمة النقدية',
      count: 120,
      countDesc: 'ر.س',
      icon: salaryImage,
      color: 'text-[#F0B213]',
      bcg: 'bg-[#fff]',
      border: 'border-[#F0B213]',
      desc: 'قيمة المنتجات التي أضيفت للسلة',
    },
    {
      title: 'القيمة النقدية',
      count: 120,
      countDesc: 'ر.س',
      icon: salaryImage2,
      color: 'text-[#5DCA42]',
      border: 'border-[#5DCA42]',
      bcg: 'bg-[#fff]',
      desc: 'متوسط قيمة السلة',
    },
  ];

  return (
    <div>
      <h3 className='text-[32px] font-bold'>لوحة التحكم</h3>
      <h3 className='text-primary text-[24px] font-bold'>لوحة التحكم</h3>
      <div className='mt-5 sm:mt-12'>
        <h2 className='text-primary font-bold text-[24px]'>الإحصائيات</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
          {defaultStats.map((item, index) => (
            <StateItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
