import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';

const SliderPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div onClick={onClick}>

            <ChevronLeftIcon className={`h-8 w-8 cursor-pointer z-10 -translate-x-3`} />
        </div>
    )
}
export default SliderPrevArrow

SliderPrevArrow.propTypes = {
    onClick: PropTypes.func
}

/* <ChevronLeftIcon
                // className={className}
                style={{ display: "block", color: "green", padding: "1rem", margin: "1rem", zIndex: "10", width: "10px" }}
                onClick={onClick} /> */