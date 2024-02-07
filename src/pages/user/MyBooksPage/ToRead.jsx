import { useContext } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"


const ToRead = () => {
    const { books } = useContext(BookContext)

    const booksDisplayed = books => books.GOING_TO_READ.map(book => <BookListElement book={book} key={book.id} />)

    return (
        <>
            {booksDisplayed(books)}
        </>
    )
}
export default ToRead