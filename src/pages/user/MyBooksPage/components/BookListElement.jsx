import BookCoverPlaceholder from '../../../../components/BookCoverPlaceholder';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookListElement = ({ book }) => {
    return (
        <>
            <div className="flex gap-4 my-4 max-w-[500px]">

                {book.imageUrl ?
                    <img src={`${book.imageUrl}`}
                        className="rounded-lg w-24 h-36 object-cover"
                    /> :
                    <BookCoverPlaceholder />
                }

                <div className='grow flex flex-col'>
                    <p className="font-semibold text-lg border-link-active">{book.title}</p>
                    <p>{book.author}</p>
                    <Link to=""
                        className='mt-auto'
                    >
                        <button className="px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md ml-auto block">Details</button>
                    </Link>
                </div>
            </div>
            <hr className="bg-light-objects last:hidden max-w-[500px]" />
        </>
    )
}
export default BookListElement

BookListElement.propTypes = {
    book: PropTypes.object
}