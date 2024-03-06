import BookListElement from "./BookListElement"
import PropTypes from 'prop-types';
import Pagination from "../../../../components/Pagination";

const SearchBookResults = ({ results, searchBook, query, totalPages }) => {

    const booksResults = (data) => data.map(result => <BookListElement key={result.id} result={result} />)

    return (
        <>
            {results?.totalItems > 0 && booksResults(results.items)}
            {results?.totalItems === 0 && <p className="text-lg">Book not found.</p>}
            <Pagination searchBook={searchBook} query={query} totalPages={totalPages} />
        </>

    )
}
export default SearchBookResults

SearchBookResults.propTypes = {
    results: PropTypes.object,
    query: PropTypes.object,
    searchBook: PropTypes.func,
    totalPages: PropTypes.number
}