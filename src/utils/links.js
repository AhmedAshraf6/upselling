import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
export const currentLinks = [
  {
    id: uuidv4(),
    text: 'الأعضاء',
    path: 'approvals',
    icon: <IoBarChartSharp />,
  },
  {
    id: uuidv4(),
    text: 'المجموعات',
    path: 'inputrequests',
    icon: <ImProfile />,
  },
];
export const requestLinks = [
  {
    id: uuidv4(),
    text: 'اضافة عضو',
    path: 'drafts',
    icon: <IoBarChartSharp />,
  },
];
export const userLinks = [
  {
    id: uuidv4(),
    text: 'All Users',
    path: 'manage/allusers',
    icon: <IoBarChartSharp />,
  },

  {
    id: uuidv4(),
    text: 'All Groups',
    path: 'manage/allgroups',
    icon: <ImProfile />,
  },
];
export const navbarLinks = [
  { id: uuidv4(), text: 'Home', path: '/' },
  { id: uuidv4(), text: 'All Apps', path: 'allapps' },
  { id: uuidv4(), text: 'Create App', path: 'createapp' },
];
