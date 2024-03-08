import PropTypes from 'prop-types';
import BookCoverPlaceholder from '../../../../components/BookCoverPlaceholder';

const BookElement = ({ book }) => {

    return (
        <div className='flex gap-2 my-4 max-w-96'>
            {book?.imageUrl ?
                <img src={`${book.imageUrl}`}
                    className="rounded-lg w-24 h-36 min-w-24 object-cover"
                /> :
                <BookCoverPlaceholder />
            }
            <div className='flex flex-col justify-between grow'>
                <div className='my-2'>
                    <p className='font-semibold text-lg'>{book.title}</p>
                    <p>{book.author}</p>
                </div>
                <div className='flex justify-start gap-2 w-full'>
                    <button className="px-2 py-1 text-center text-sm bg-link-active hover:bg-link-active-hover text-light-bg rounded-md transition duration-200 ">Add mood</button>
                    <button className="px-2 py-1 text-center text-sm text-link-active hover:bg-link-active-hover hover:text-light-bg bg-light-bg border border-link-active rounded-md transition duration-200 ">Details</button>
                </div>
            </div>

        </div >
    )
}
export default BookElement

BookElement.propTypes = {
    book: PropTypes.object
}