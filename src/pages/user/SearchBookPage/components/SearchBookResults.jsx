import BookListElement from "./BookListElement"
import PropTypes from 'prop-types';
import Pagination from "../../../../components/Pagination";

const SearchBookResults = ({ results, setResults }) => {

    const booksResults = (data) => data.map(result => <BookListElement key={result.id} result={result} />)

    return (
        <>
            {results?.totalItems > 0 && booksResults(results.items)}
            {results?.totalItems === 0 && <p className="text-lg">Book not found.</p>}
            {results?.totalItems > 0 && <Pagination results={results} setResults={setResults}/>}
        </>
    )
}
export default SearchBookResults

SearchBookResults.propTypes = {
    results: PropTypes.object, 
    setResults: PropTypes.func
}