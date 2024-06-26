import { useCallback, useState } from "react"
import BookListElement from "./BookListElement"
import Loading from "../../../../components/Loading"
import BooksPagination from "./BooksPagination"
import PropTypes from 'prop-types'
import useBook from "../../../../hooks/useBook"


const BookList = ({ shelf }) => {
    const { books, isLoading } = useBook()
    const [currentPage, setCurrentPage] = useState(1)

    const booksDisplayed = useCallback((page = 1) => {
        if (books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, `${shelf}`))
            return books[`${shelf}`].filter((book, index) => index >= (page - 1) * 10 && index < page * 10).map(book => <BookListElement book={book} key={book.id} />)
    }, [books, shelf])

    const totalPages = Math.ceil(books?.[`${shelf}`]?.length / 10) || 0

    return (
        <>
            <BooksPagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            {isLoading && <Loading />}
            {booksDisplayed(currentPage)}
            {(books && !Object.hasOwn(books, `${shelf}`)) && <p>No books on the list yet.</p>}
            <BooksPagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </>
    )
}
export default BookList

BookList.propTypes = {
    shelf: PropTypes.string
}