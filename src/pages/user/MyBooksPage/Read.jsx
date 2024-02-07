import { useContext } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"

const Read = () => {
    const { books } = useContext(BookContext)

    const booksDisplayed = books => books.READ.map(book => <BookListElement book={book} key={book.id} />)

    return (
        <>
            {booksDisplayed(books)}
        </>
    )
}
export default Read