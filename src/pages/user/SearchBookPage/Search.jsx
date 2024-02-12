import Loading from "../../../components/Loading"
import SearchBook from "./components/SearchBookForm"
import SearchBookResults from "./components/SearchBookResults"
import { useState } from "react"

const Search = () => {

  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchBook = async (author, title) => {
    try {
      setResults(null)
      setIsLoading(true)
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=20`)
      const data = await response.json()
      console.log(data)
      setResults(data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Search book</h1>
      <p className="mb-3">Find a book by title, author or both.</p>
      <SearchBook setResults={setResults} searchBook={searchBook} />
      {isLoading ? <Loading /> : null}
      <SearchBookResults results={results} />
    </div>
  )
}
export default Search