import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

const ConditionalLinkWrapper = ({ condition, to, children }) => {
    const location = useLocation()
    return condition ?
        <Link to={to} state={location.pathname}>
            {children}
        </Link>
        :
        children
}
export default ConditionalLinkWrapper

ConditionalLinkWrapper.propTypes = {
    condition: PropTypes.bool,
    to: PropTypes.string,
    children: PropTypes.node
} 