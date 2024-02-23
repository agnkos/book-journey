import { useContext } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"

const Reading = () => {
    const { books } = useContext(BookContext)

    const booksDisplayed = books => books.READING.map(book => <BookListElement book={book} key={book.id} />)


    return (
        <>
            {/* {Object.keys(books).length !== 0 && booksDisplayed(books)} */}
            {(Object.keys(books).length !== 0 && Object.hasOwn(books, 'READING')) && booksDisplayed(books)}
        </>
    )
}
export default Reading