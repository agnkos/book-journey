import { useContext, useMemo } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"
import Loading from "../../../components/Loading"

const Reading = () => {
    const { books, isLoading } = useContext(BookContext)

    // const booksDisplayed = books => books.READING.map(book => <BookListElement book={book} key={book.id} />)

    const booksDisplayed = useMemo(() => {
        if (books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'READING'))
            return books.READING.map(book => <BookListElement book={book} key={book.id} />)
    }, [books])

    return (
        <>
            {isLoading && <Loading />}
            {booksDisplayed}
            {(books && !Object.hasOwn(books, 'READING')) && <p>No books on the list yet.</p>}
            {/* {(books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'READING')) && booksDisplayed(books)} */}
            {/* {books ? (
                <>
                    {Object.hasOwn(books, 'READING') ? (
                        booksDisplayed(books)
                    ) : (
                        <p>No books on the list yet.</p>
                    )}
                </>
            ) : (
                <Loading />
            )} */}
        </>
    )
}
export default Reading