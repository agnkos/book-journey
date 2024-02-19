import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import BookCoverPlaceholder from '../../../../components/BookCoverPlaceholder';
import EditModal from '../../../../components/EditModal';
import BookContext from '../../../../context/BookContext';

const BookListElement = ({ result }) => {
    const [showAddModal, setShowAddModal] = useState(false)
    const { books } = useContext(BookContext)

    const closeAddModal = () => setShowAddModal(false)
    const openAddModal = () => setShowAddModal(true)

    const isOnTheList = Object.values(books).flatMap(array => array.some(book => book.title === result.volumeInfo.title))
    const newList = Object.values(books).flatMap(array => array.map(book => book))
    console.log('new list', newList)
    const filteredList = newList.filter(book => book.title === result.volumeInfo.title)
    console.log('filtered list', filteredList)
    // console.log('new list filter', newList.filter(book => book.title === result.volumeInfo.title))
    // const filteredBooks2 = Object.values(books).filter(array => array.some(book => book.title === result.volumeInfo.title));
    // console.log('filtered books', filteredBooks2)

    // console.log('filter', Object.values(books).flatMap(array => array.filter(book => book.title === result.volumeInfo.title)))

    // console.log('book title', Object.values(books).flatMap(array => array.map(book => console.log(book.title))))
    // console.log('object values', Object.values(books).flatMap(array => array.map(book => book)))
    // .filter(book => book.title === result.volumeInfo.title)
    // console.log('result and book title', result.volumeInfo.title)
    // console.log('isbn', result.volumeInfo.industryIdentifiers[0].identifier)
    // console.log('all books', books)
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
                        {isOnTheList && <p>on the list</p>}
                    </div>
                    {/* <Link to="/addbook" state={{ author: result.volumeInfo.authors[0], title: result.volumeInfo.title }}
                        className='mt-auto'
                    > */}
                    <button
                        onClick={openAddModal}
                        className="px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md ml-auto block">Add to list</button>
                    {/* </Link> */}
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