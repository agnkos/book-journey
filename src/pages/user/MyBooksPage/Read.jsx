import { useContext } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "./components/BookListElement"

const Read = () => {
    const { books } = useContext(BookContext)

    // useMemo
    const booksDisplayed = books => books.READ.map(book => <BookListElement book={book} key={book.id} />)

    // console.log('books read', books.READ)

    return (
        <>
            {(books !== undefined && Object.keys(books).length !== 0 && Object.hasOwn(books, 'READ')) && booksDisplayed(books)}
        </>
    )
}
export default Read