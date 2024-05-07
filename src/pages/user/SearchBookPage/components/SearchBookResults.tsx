import BookListElement from "./BookListElement"
import PropTypes from 'prop-types';
import { BookDetailType } from "../../../../types";

type SearchBookProps = {
    results: {
        items: BookDetailType[],
        totalItems: number
    }
}

const SearchBookResults = ({ results }: SearchBookProps) => {

    const booksResults = (data: BookDetailType[]) => data.map(result => <BookListElement key={result.id} result={result} />)

    return (
        <>
            {results?.totalItems > 0 && booksResults(results.items)}
            {results?.totalItems === 0 && <p className="text-lg">Book not found.</p>}
        </>

    )
}
export default SearchBookResults

SearchBookResults.propTypes = {
    results: PropTypes.object,
}