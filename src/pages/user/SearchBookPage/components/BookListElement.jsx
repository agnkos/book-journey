import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookCoverPlaceholder from '../../../../components/BookCoverPlaceholder';

const BookListElement = ({ result }) => {
    return (
        <>
            <div key={result.id} className="flex gap-4 my-4 max-w-[500px]">

                {result.volumeInfo?.imageLinks?.smallThumbnail ?
                    <img src={`${result.volumeInfo?.imageLinks?.smallThumbnail}`}
                        className="rounded-lg w-24 h-36 min-w-24 object-cover"
                    /> :
                    <BookCoverPlaceholder />
                }

                <div className='grow flex flex-col'>
                    <div className='flex flex-col grow'>

                    <p className="font-semibold text-lg border-link-active">{result.volumeInfo.title}</p>
                    <p>{result.volumeInfo.authors}</p>
                    </div>
                    <Link to="/addbook" state={{ author: result.volumeInfo.authors, title: result.volumeInfo.title }}
                        className='mt-auto'
                    >
                        <button className="px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md ml-auto block">Add to list</button>
                    </Link>
                </div>
            </div>
            <hr className="bg-light-objects last:hidden max-w-[500px]" />
        </>
    )
}
export default BookListElement

BookListElement.propTypes = {
    result: PropTypes.object
}