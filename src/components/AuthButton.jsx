import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const AuthButton = ({ text, link }) => {
    return (
        <NavLink to={link} className="w-11/12 px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md">{text}</NavLink>
    )
}
export default AuthButton

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}