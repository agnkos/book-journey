import Loading from "../../../components/Loading"
import SearchBook from "./components/SearchBookForm"
import SearchBookResults from "./components/SearchBookResults"
import { useEffect, useState } from "react"
import ResultsPagination from "./components/ResultsPagination"

const Search = () => {
  const [results, setResults] = useState(null)
  const [query, setQuery] = useState({ author: '', title: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

  const searchBook = async (author = '', title = '', index = 0) => {
    console.log('index search', index)
    setTotalPages(0)
    try {
      setQuery({ author: author, title: title })
      setResults(null)
      setIsLoading(true)
      const dataAuthor = author.replace(/ /g, '+')
      const dataTitle = title.replace(/ /g, '+')
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${dataTitle}"+inauthor:"${dataAuthor}"&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=20&startIndex=${index}`)
      console.log('response', response)
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
    console.log('total pages', totalPages)
    console.log('results', results)
    console.log('query', query)
  }, [totalPages, query, results])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Search book</h1>
      <p className="mb-3">Find a book by title, author or both.</p>
      <SearchBook searchBook={searchBook} />
      {isLoading ? <Loading /> : null}
      <SearchBookResults results={results} searchBook={searchBook} query={query} totalPages={totalPages} />
      <ResultsPagination searchBook={searchBook} query={query} totalPages={totalPages} />
    </div>
  )
}
export default Search