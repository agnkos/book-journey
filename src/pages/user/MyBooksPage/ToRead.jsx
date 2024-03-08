import { useContext, useCallback, useState } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"
import Loading from "../../../components/Loading"
import BooksPagination from "./components/BooksPagination"

const ToRead = () => {
    const { books, isLoading } = useContext(BookContext)
    const [currentPage, setCurrentPage] = useState(1)

    // const booksDisplayed = useMemo(() => {
    //     if (books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'GOING_TO_READ'))
    //         return books.GOING_TO_READ.map(book => <BookListElement book={book} key={book.id} />)
    // }, [books])

    const booksDisplayed = useCallback((page = 1) => {
        if (books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'GOING_TO_READ'))
            return books.GOING_TO_READ.filter((book, index) => index >= (page - 1) * 10 && index < page * 10).map(book => <BookListElement book={book} key={book.id} />)
    }, [books])

    const totalPages = Math.ceil(books?.GOING_TO_READ?.length / 10)

    return (
        <>
            {isLoading && <Loading />}
            {booksDisplayed(currentPage)}
            {(books && !Object.hasOwn(books, 'GOING_TO_READ')) && <p>No books on the list yet.</p>}
            <BooksPagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </>
    )
}
export default ToRead