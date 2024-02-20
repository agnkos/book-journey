import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useLocation, Link } from "react-router-dom"
import BookCoverPlaceholder from '../../../../components/BookCoverPlaceholder';
import EditModal from '../../../../components/EditModal';
import BookContext from '../../../../context/BookContext';

const BookListElement = ({ result }) => {
    const [showAddModal, setShowAddModal] = useState(false)
    const { books } = useContext(BookContext)
    const location = useLocation()

    const closeAddModal = () => setShowAddModal(false)
    const openAddModal = () => setShowAddModal(true)

    const newList = Object.values(books).flatMap(array => array.map(book => book))
    const filteredList = newList.filter(book => book.title === result.volumeInfo.title)

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
                        {filteredList.length > 0 &&
                            <p className='text-sm'>
                                status: <span className='font-semibold'>{filteredList[0].status === "READ" ? 'read' : filteredList[0].status === "READING" ? 'reading' : 'to read'}</span>
                            </p>}
                    </div>
                    {filteredList.length > 0 ?
                        <Link to={`/books/${filteredList[0].id}`}
                            state={{ path: location.pathname }}
                        >
                            <button className="px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md ml-auto block">Details</button>
                        </Link>
                        :
                        <button
                            onClick={openAddModal}
                            className="px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md ml-auto block">Add to list</button>}
                </div>
            </div>
            <hr className="bg-light-objects last:hidden max-w-[500px]" />
            {showAddModal && <EditModal closeModal={closeAddModal} bookDetail={result} />}
        </>
    )
}
export default BookListElement

BookListElement.propTypes = {
    result: PropTypes.object
}