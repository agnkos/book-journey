import PropTypes from 'prop-types';
import { StarIcon } from '@heroicons/react/16/solid'

const StarRating = ({ bookDetail }) => {

    const starElements = [1,2,3,4,5].map(num => <StarIcon key={num} className={`w-5 h-5 ${bookDetail.averageRating >= num ? 'fill-main-accent' : 'fill-light-objects'}`} />)

    return (
        <div className="flex">
            {starElements}
        </div>
    )
}
export default StarRating

StarRating.propTypes = {
    bookDetail: PropTypes.object
}