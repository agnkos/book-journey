import { useContext } from "react"
import BookContext from "../../../context/BookContext"
import BookListElement from "../MyBooksPage/components/BookListElement"

const Favourites = () => {
  const { books } = useContext(BookContext)

  const favouriteBooks = books.READ.filter(book => book.favourite === true).map(book =>
    <BookListElement key={book.id} book={book} />)

  console.log(books)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">My favourite books</h1>
      {favouriteBooks}
    </div>
  )
}
export default Favourites