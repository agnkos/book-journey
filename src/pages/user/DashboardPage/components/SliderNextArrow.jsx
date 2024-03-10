import { ChevronRightIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';


const SliderNextArrow = (props) => {
    const { onClick} = props;
    return (
        <div onClick={onClick} >

            <ChevronRightIcon className={` h-8 w-8 cursor-pointer z-10 translate-x-3`} />
        </div>
    )
}
export default SliderNextArrow

SliderNextArrow.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
}

// className={` h-8 w-10 cursor-pointer z-10`}