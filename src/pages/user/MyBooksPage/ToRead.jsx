import { useContext, useMemo } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"
import Loading from "../../../components/Loading"


const ToRead = () => {
    const { books, isLoading } = useContext(BookContext)

    // const booksDisplayed = books => books.GOING_TO_READ.map(book => <BookListElement book={book} key={book.id} />)
    const booksDisplayed = useMemo(() => {
        if (books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'GOING_TO_READ'))
            return books.GOING_TO_READ.map(book => <BookListElement book={book} key={book.id} />)
    }, [books])

    return (
        <>
            {isLoading && <Loading />}
            {booksDisplayed}
            {/* {(books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'GOING_TO_READ')) && booksDisplayed(books)} */}
            {(books && !Object.hasOwn(books, 'GOING_TO_READ')) && <p>No books on the list yet.</p>}
        </>
    )
}
export default ToRead