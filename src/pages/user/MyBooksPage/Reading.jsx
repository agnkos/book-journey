import { useContext } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"

const Reading = () => {
    const { books } = useContext(BookContext)

    const booksDisplayed = books => books.READING.map(book => <BookListElement book={book} key={book.id} />)


    return (
        <>
<<<<<<< HEAD
            {/* {Object.keys(books).length !== 0 && booksDisplayed(books)} */}
            {(Object.keys(books).length !== 0 && Object.hasOwn(books, 'READING')) && booksDisplayed(books)}
=======
            {(books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'READING')) && booksDisplayed(books)}
>>>>>>> main
        </>
    )
}
export default Reading