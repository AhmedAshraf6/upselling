import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { RiHome6Fill } from 'react-icons/ri';

import { ImProfile } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
export const main = [
  {
    id: uuidv4(),
    text: 'الرئيسية',
    path: '/',
    icon: <RiHome6Fill />,
  },
  {
    id: uuidv4(),
    text: 'الصفحات التعريفية',
    path: '/pages-intro',
    icon: <IoBarChartSharp />,
  },
];
export const settings = [
  {
    id: uuidv4(),
    text: 'باقة المتجر',
    path: '/package',
    icon: <IoBarChartSharp />,
  },
  {
    id: uuidv4(),
    text: 'بيانات التاجر الاساسية',
    path: '/tager-info',
    icon: <ImProfile />,
  },
  {
    id: uuidv4(),
    text: 'بيانات التطبيق',
    path: '/about-app',
    icon: <ImProfile />,
  },
  {
    id: uuidv4(),
    text: 'لوحة التحكم',
    path: '/dashboard',
    icon: <ImProfile />,
  },
];
export const storeView = [
  {
    id: uuidv4(),
    text: 'شاشة البداية',
    path: '/start-screen',
    icon: <IoBarChartSharp />,
  },
  {
    id: uuidv4(),
    text: 'إعدادات المظهر العام',
    path: '/public-setting-view',
    icon: <IoBarChartSharp />,
  },
  {
    id: uuidv4(),
    text: 'تخصيص واجهة التطبيق',
    path: '/custom-app-view',
    icon: <IoBarChartSharp />,
  },
];
export const appStore = [
  {
    id: uuidv4(),
    text: 'عرض متجر التطبيقات',
    path: 'app-store',
    icon: <IoBarChartSharp />,
  },
];
