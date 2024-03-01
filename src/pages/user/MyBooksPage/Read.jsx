import { useContext, useMemo } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"
import Loading from "../../../components/Loading"

const Read = () => {
    const { books, isLoading } = useContext(BookContext)

    // add useMemo
    // const booksDisplayed = books => books.READ.map(book => <BookListElement book={book} key={book.id} />)

    // const displayBooks = items => items.READ.map(item => <BookListElement book={item} key={item.id} />)
    // const booksDisplayed = useMemo(() => displayBooks(books), [books])

    const booksDisplayed2 = useMemo(() => {
        if (books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'READ'))
            return books.READ.map(book => <BookListElement book={book} key={book.id} />)
    }, [books])

    return (
        <>
            {isLoading && <Loading />}
            {booksDisplayed2}
            {(books && !Object.hasOwn(books, 'READ')) && <p>No books on the list yet.</p>}
            {/* {(books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'READ')) && booksDisplayed(books)} */}
            {/* {(books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'READ')) && booksDisplayed} */}
        </>
    )
}
export default Read