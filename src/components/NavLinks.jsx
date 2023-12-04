import { NavLink } from 'react-router-dom';
import { appStore, main, settings, storeView } from '../utils/links';
import { useSelector } from 'react-redux';

const NavLinks = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className='flex flex-col '>
      <div className='px-3'>
        {main.map((link) => {
          const { text, path, id, icon } = link;
          return (
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive
                  ? 'text-primary flex items-center gap-x-2 text-base py-3 text-[16px] font-semibold'
                  : 'text-black flex items-center gap-x-2 text-base py-3 text-[16px] font-semibold';
              }}
              key={id}
            >
              <span className='text-lg'>{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
      <h2 className='text-sm text-grayColor font-semibold text-[13px]'>
        الاعدادات
      </h2>
      <div className='px-3'>
        {settings.map((link) => {
          const { text, path, id, icon } = link;
          return (
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive
                  ? 'text-primary flex items-center gap-x-2 text-base py-3 text-[16px] font-semibold'
                  : 'text-black flex items-center gap-x-2 text-base py-3 text-[16px] font-semibold';
              }}
              key={id}
            >
              <span className='text-lg'>{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
      <h2 className='text-base text-grayColor font-semibold text-[13px]'>
        مظهر المتجر
      </h2>
      <div className='px-3'>
        {storeView.map((link) => {
          const { text, path, id, icon } = link;
          return (
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive
                  ? 'text-primary flex items-center gap-x-2 text-base py-3 text-[16px] font-semibold'
                  : 'text-black flex items-center gap-x-2 text-base py-3 text-[16px] font-semibold';
              }}
              key={id}
            >
              <span className='text-lg'>{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
      <h2 className='text-base text-grayColor font-semibold text-[13px]'>
        متجر التطبيقات
      </h2>
      <div className='px-3'>
        {appStore.map((link) => {
          const { text, path, id, icon } = link;
          return (
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive
                  ? 'text-primary flex items-center gap-x-2 text-base py-3 text-[16px] font-semibold'
                  : 'text-black flex items-center gap-x-2 text-base py-3 text-[16px] font-semibold';
              }}
              key={id}
            >
              <span className='text-lg'>{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default NavLinks;
