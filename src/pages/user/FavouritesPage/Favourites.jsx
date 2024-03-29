import BookListElement from "../MyBooksPage/components/BookListElement"
import useBook from "../../../hooks/useBook"

const Favourites = () => {
  const { books } = useBook()

  const favoriteBooks = Object.values(books).flatMap(array => array.filter(book => book.favourite === true)).map(book =>
    <BookListElement key={book.id} book={book} />)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">My favourite books</h1>
      {books && favoriteBooks}
    </div>
  )
}
export default Favourites