import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import BookListElement from "./components/BookListElement"

const Books = () => {
  const { user } = useAuth()
  const [books, setBooks] = useState()
  const [displayedBooks, setDisplayedBooks] = useState('read')

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book/all_books', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        console.log(data)
        setBooks(data)
      } catch (error) {
        console.log(error)
      }
    }
    getBooks()
  }, [user.token])

  const booksListDisplayed = books => books.map(book => <BookListElement book={book} key={book.id} />)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">My books</h1>
      <div className="flex gap-4 text-xl mb-2">
        <button
          onClick={() => setDisplayedBooks('read')}
          className={`${displayedBooks === 'read' ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >read</button>
        <button
          onClick={() => setDisplayedBooks('reading')}
          className={`${displayedBooks === 'reading' ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >reading</button>
        <button
          onClick={() => setDisplayedBooks('toread')}
          className={`${displayedBooks === 'toread' ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >to read</button>
      </div>

      <div className="py-3">
        {books && displayedBooks === "read" && booksListDisplayed(books.READ)}
        {books && displayedBooks === "reading" && booksListDisplayed(books.READING)}
        {books && displayedBooks === "toread" && booksListDisplayed(books.GOING_TO_READ)}
      </div>
    </div>
  )
}
export default Books