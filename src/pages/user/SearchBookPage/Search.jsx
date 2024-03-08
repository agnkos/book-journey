import Loading from "../../../components/Loading"
import SearchBook from "./components/SearchBookForm"
import SearchBookResults from "./components/SearchBookResults"
import { useEffect, useState } from "react"
import Pagination from "../../../components/Pagination"

const Search = () => {
  const [results, setResults] = useState(null)
  const [query, setQuery] = useState({ author: '', title: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState()

  const searchBook = async (author, title, index = 0) => {
    console.log('index search', index)
    try {
      setQuery({ author: author, title: title })
      setResults(null)
      setIsLoading(true)
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=20&startIndex=${index}`)
      const data = await response.json()
      console.log(data)
      setResults(data)
      setTotalPages(Math.ceil(data.totalItems / 20))
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log('results', results)
    console.log('query', query)
  }, [results, query])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Search book</h1>
      <p className="mb-3">Find a book by title, author or both.</p>
      <SearchBook searchBook={searchBook} />
      {isLoading ? <Loading /> : null}
      <SearchBookResults results={results} searchBook={searchBook} query={query} totalPages={totalPages} />
      <Pagination searchBook={searchBook} query={query} totalPages={totalPages} />
    </div>
  )
}
export default Search