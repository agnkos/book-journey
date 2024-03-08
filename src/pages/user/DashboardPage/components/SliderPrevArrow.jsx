import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';

const SliderPrevArrow = (props) => {
    const { onClick } = props;
    return (

        <ChevronLeftIcon className={`h-8 w-10 block cursor-pointer z-10`} onClick={onClick} />

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