import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';

type PropsType = {
    onClick: () => void
}

const SliderPrevArrow = (props: PropsType) => {
    const { onClick } = props;
    return (
        <div onClick={onClick} className="absolute inset-y-1/2 top-[45%] left-1 opacity-40 cursor-pointer z-10">

            <ChevronLeftIcon className={`h-8 w-8 rounded-lg -translate-x-3 bg-light-objects`} />
        </div>
    )
}
export default SliderPrevArrow

SliderPrevArrow.propTypes = {
    onClick: PropTypes.func
}

