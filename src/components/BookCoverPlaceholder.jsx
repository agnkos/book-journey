import { BookOpenIcon } from '@heroicons/react/24/outline';

const BookCoverPlaceholder = () => {
    return (
        <div className="flex items-center rounded-lg w-24 h-36 object-cover bg-light-objects">
            <BookOpenIcon className='stroke-light-bg' />
        </div>
    )
}
export default BookCoverPlaceholder