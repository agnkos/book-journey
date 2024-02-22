import { useContext } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "../MyBooksPage/components/BookListElement"
import { useLocation } from "react-router-dom"

const Favourites = () => {
  const { books } = useContext(BookContext)
  const location = useLocation()

  const favoriteBooks = Object.values(books).flatMap(array => array.filter(book => book.favourite === true)).map(book =>
    <BookListElement key={book.id} book={book} from={location.pathname} />)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">My favourite books</h1>
      {books && favoriteBooks}
    </div>
  )
}
export default Favourites