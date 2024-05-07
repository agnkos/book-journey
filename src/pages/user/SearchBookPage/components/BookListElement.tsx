import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation, Link } from "react-router-dom"
import BookCoverPlaceholder from '../../../../components/BookCoverPlaceholder';
import EditModal from '../../../../components/EditModal';
import useBook from '../../../../hooks/useBook';
import { BookDetailType } from '../../../../types';

type BookListElementProps = {
    result: BookDetailType
}

const BookListElement = ({ result }: BookListElementProps) => {
    const [showAddModal, setShowAddModal] = useState(false)
    const { books } = useBook()
    const location = useLocation()

    const closeAddModal = () => setShowAddModal(false)
    const openAddModal = () => setShowAddModal(true)

    const newList = books && Object.values(books).flatMap(array => array.map(book => book))
    const filteredList = newList && newList.filter(book => book.googleBookId === result.id)

    return (
        <>
            <div key={result.id} className="flex gap-4 my-4 max-w-[500px]">
                {result.volumeInfo?.imageLinks?.smallThumbnail ?
                    <img src={`${result.volumeInfo?.imageLinks?.smallThumbnail}`}
                        className="rounded-lg w-24 h-36 min-w-24 object-cover"
                    /> :
                    <BookCoverPlaceholder />
                }
                {filteredList && <div className='grow flex flex-col'>
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
                            state={location.pathname}
                        >
                            <button className="px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md ml-auto block transition duration-150 ">Details</button>
                        </Link>
                        :
                        <button
                            onClick={openAddModal}
                            className="px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md ml-auto block transition duration-150 ">Add to list</button>}
                </div>}
            </div>
            <hr className="bg-light-objects last-of-type:hidden max-w-[500px]" />
            {showAddModal && <EditModal closeModal={closeAddModal} bookDetail={result} />}
        </>
    )
}
export default BookListElement

BookListElement.propTypes = {
    result: PropTypes.object
}