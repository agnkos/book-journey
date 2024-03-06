import { BookOpenIcon } from '@heroicons/react/24/outline';

const BookCoverPlaceholderBig = () => {
    return (
        <div className="flex items-center rounded-lg w-32 min-w-32 h-44 object-cover bg-light-objects">
            <BookOpenIcon className='stroke-light-bg' />
        </div>
    )
}
export default BookCoverPlaceholderBig