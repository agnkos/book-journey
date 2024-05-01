import { NavLink } from "react-router-dom";
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from "../hooks/useAuth";

type MenuProps = {
    toggle: boolean,
    closeMenu: () => void,
}

const Menu = forwardRef<HTMLUListElement, MenuProps>((props, menuRef) => {
    const { logout } = useAuth();
    const { toggle, closeMenu } = props

    return (
        <ul className={`fixed bg-main-accent w-full py-4 px-6 text-end 
        ${toggle ? 'translate-y-0 transition duration-500 ease-in-out z-20' : 'transition duration-500 fixed -translate-y-96 ease-in-out '}
        `}
            ref={menuRef}
        >
            <li onClick={closeMenu}><NavLink to='dashboard' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 block hover:text-link-active transition duration-150`}>Home</NavLink></li>
            <li onClick={closeMenu}><NavLink to='books' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 block hover:text-link-active transition duration-150`}>My books</NavLink></li>
            <li onClick={closeMenu}><NavLink to='addbook' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 block hover:text-link-active transition duration-150`}>Add a book</NavLink></li>
            <li onClick={closeMenu}><NavLink to='search' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 block hover:text-link-active transition duration-150`}>Search</NavLink></li>
            <li onClick={closeMenu}><NavLink to='favourites' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 block hover:text-link-active transition duration-150`}>Favourites</NavLink></li>
            <li onClick={closeMenu}><NavLink to='friends' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 block hover:text-link-active transition duration-150`}>Friends</NavLink></li>
            <li onClick={closeMenu}><NavLink to='stats' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 block hover:text-link-active transition duration-150`}>Mood Tracker</NavLink></li>
            <li onClick={closeMenu}><NavLink to='profile' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 mb-1 block hover:text-link-active transition duration-150`}>Profile</NavLink></li>
            <li onClick={closeMenu}><NavLink to='about' className={({ isActive }) => `${isActive ? 'text-link-active' : 'text-light-bg'} py-1 mb-1 block hover:text-link-active transition duration-150`}>About</NavLink></li>
            <li onClick={logout} className="border-t pt-2 text-light-bg hover:text-link-active transition duration-150 cursor-pointer">Log out</li>
        </ul>
    )
})
export default Menu

Menu.displayName = "Menu"

Menu.propTypes = {
    toggle: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
}