import BookCoverPlaceholder from '../../../../components/BookCoverPlaceholder';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { BookType } from '../../../../types';

type BookListElementProps = {
    book: BookType
}

const BookListElement = ({ book }: BookListElementProps) => {
    const location = useLocation()
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
                    <Link to={`/books/${book.id}`}
                        state={location.pathname}
                        className='mt-auto'
                    >
                        <button className="px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md ml-auto block transition duration-200">Details</button>
                    </Link>
                </div>
            </div>
            <hr className="bg-light-objects last-of-type:hidden last:bg-pink-600 max-w-[500px]" />
        </>
    )
}
export default BookListElement

BookListElement.propTypes = {
    book: PropTypes.object,
}