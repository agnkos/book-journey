import { HomeIcon, BookOpenIcon, UsersIcon, ChartPieIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const MenuBottom = () => {
    return (
        <div className='w-full fixed bottom-0 flex px-4 py-2 bg-main-accent justify-between items-center'>
            <NavLink to='dashboard'>
                {({ isActive }) => (
                    <HomeIcon className={`w-6 h-6 ${isActive ? 'stroke-link-active' : 'stroke-light-bg'} hover:stroke-link-active-hover transition duration-150`} />
                )}
            </NavLink>
            <NavLink to='books'>
                {({ isActive }) => (
                    <BookOpenIcon className={`w-6 h-6 ${isActive ? 'stroke-link-active' : 'stroke-light-bg'} hover:stroke-link-active-hover transition duration-150`} />
                )}
            </NavLink>
            <NavLink to='search' className='scale-[1.4] -translate-y-3 rounded-full outline-zinc-50 outline outline-[1.5px]  bg-main-accent p-2'>
                {({ isActive }) => (
                    <MagnifyingGlassIcon className={`w-6 h-6 ${isActive ? 'stroke-link-active' : 'stroke-light-bg'} 
                 
                    hover:stroke-link-active-hover transition duration-150`} />
                )}
            </NavLink>
            <NavLink to='friends'>
                {({ isActive }) => (
                    <UsersIcon className={`w-6 h-6 ${isActive ? 'stroke-link-active' : 'stroke-light-bg'} hover:stroke-link-active-hover transition duration-150`} />
                )}
            </NavLink>
            <NavLink to='stats'>
                {({ isActive }) => (
                    <ChartPieIcon className={`w-6 h-6 ${isActive ? 'stroke-link-active' : 'stroke-light-bg'} hover:stroke-link-active-hover transition duration-150`} />
                )}
            </NavLink>
        </div>
    )
}
export default MenuBottom