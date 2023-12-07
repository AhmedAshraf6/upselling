import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children }) {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to='register' />;
  }
  return children;
}
// <div className='   overflow-hidden w-[90vw]  flex justify-between items-center gap-3 flex-wrap sm:flex-nowrap  align-element-register mt-3 lg:mt-0 '>
//   <div className='flex flex-wrap items-center gap-2 '>
//     <span>جميع الحقوق محفوظة لـ تاسك اب - 2023</span>
//     <img src={footerLogo} alt='footer logo' />
//   </div>
//   <div className='flex flex-wrap gap-2'>
//     <div className='flex gap-2 items-center'>
//       <img src={address} alt='address' />
//       <span className='text-[#666] text-xs'>
//         طريق الامام سعود بن عبد العزيز (مخرج 9), الرياض
//       </span>
//     </div>
//     <div className='flex gap-2 items-center'>
//       <img src={mail} alt='address' />
//       <span className='text-[#666] text-xs'>Apps@AppsBunches.com</span>
//     </div>
//     <div className='flex gap-2 items-center'>
//       <img src={phone} alt='address' />
//       <span className='text-[#666] text-xs'>+966 532 331 339</span>
//     </div>
//   </div>
// </div>;
