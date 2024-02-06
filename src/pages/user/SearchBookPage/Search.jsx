import SearchBook from "./components/SearchBookForm"
import SearchBookResults from "./components/SearchBookResults"
import { useState } from "react"

const Search = () => {

  const [results, setResults] = useState()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Search book</h1>
      <p className="mb-3">Find a book by title, author or both.</p>
      <SearchBook setResults={setResults} results={results} />
      <SearchBookResults results={results} />
    </div>
  )
}
export default Search