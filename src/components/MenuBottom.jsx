import { HomeIcon, BookOpenIcon, UsersIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const MenuBottom = () => {
    return (
        <div className='flex p-4 bg-main-accent justify-between'>
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