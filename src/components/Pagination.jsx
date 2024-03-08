import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const Pagination = ({ searchBook, query, totalPages }) => {

    const handlePageChange = (selectedPage) => {
        console.log('selected page', selectedPage)
        const index = (selectedPage.selected + 1) * 20 - 20;
        console.log('index click', index)
        searchBook(query.author, query.title, index)
    };

    useEffect(() => {
        console.log('total pages', totalPages)
    })

    return (
        <div>
            <ReactPaginate
                pageCount={totalPages}
                onPageChange={handlePageChange}
                breakLabel={"..."}
                // center numbers - how many : ...4 5 6 ...
                pageRangeDisplayed={3}
                // margin numbers: 1 ... 4 5 6 ... 10
                marginPagesDisplayed={1}
                previousLabel={<ChevronLeftIcon className="w-6 h-6" />}
                nextLabel={<ChevronRightIcon className="w-6 h-6" />}
                containerClassName={'flex items-center justify-center mt-8 mb-4'}
                pageClassName={'p-2 hover:text-link-active'}
                previousClassName={`${totalPages > 0 ? 'hover:text-link-active' : 'hidden'}`}
                nextClassName={`${totalPages > 0 ? 'hover:text-link-active' : 'hidden'}`}
                activeClassName={'font-bold'}
            />
        </div>
    )
}
export default Pagination

Pagination.propTypes = {
    query: PropTypes.object,
    searchBook: PropTypes.func,
    totalPages: PropTypes.number,
}