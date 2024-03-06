// import { useEffect, useState } from "re`act";
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({ searchBook, query, totalPages }) => {
    // const [currentPage, setCurrentPage] = useState(0)

    const handlePageChange = (selectedPage) => {
        console.log('selected page', selectedPage)
        const index = (selectedPage.selected + 1) * 20 - 20;
        console.log('index click', index)
        searchBook(query.author, query.title, index)
    };

    return (
        <div>
            <ReactPaginate
                pageCount={totalPages}
                onPageChange={handlePageChange}
                // forcePage={currentPage}
                breakLabel={"..."}
                pageRangeDisplayed={2}
                containerClassName={'flex items-center justify-center mt-8 mb-4'}
                pageClassName={'p-2 hover:text-link-active'}
                previousClassName={'hover:text-link-active'}
                nextClassName={'hover:text-link-active'}
                activeClassName={'font-bold'}
            />
        </div>
    )
}
export default Pagination

Pagination.propTypes = {
    query: PropTypes.object,
    searchBook: PropTypes.func,
    totalPages: PropTypes.number
}