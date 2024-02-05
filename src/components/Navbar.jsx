import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';


const Navbar = ({ toggleMenu, toggle }) => {
    return (
        <div className='fixed top-0 w-full flex p-4 bg-main-accent justify-between z-10'>
            <div className='flex'>
                <BookOpenIcon className='w-6 h-6 text-light-bg' />
                <p className='text-light-bg font-semibold'>BookJourney</p>
            </div>
            {toggle ?
                <XMarkIcon className='w-6 h-6 text-light-bg cursor-pointer' onClick={toggleMenu} />
                :
                <Bars3BottomRightIcon className='w-6 h-6 text-light-bg cursor-pointer' onClick={toggleMenu} />}
        </div>
    )
}
export default Navbar

Navbar.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    toggle: PropTypes.bool.isRequired
}