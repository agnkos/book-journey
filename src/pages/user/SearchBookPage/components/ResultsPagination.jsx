import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// import { useEffect } from 'react';

const ResultsPagination = ({ searchBook, query, totalPages, currentPage, setCurrentPage }) => {

    const handlePageChange = async (selectedPage) => {
        console.log('selected page', selectedPage)
        setCurrentPage(selectedPage.selected)
        const index = (selectedPage.selected + 1) * 20 - 20;
        // console.log('index click', index)
        await searchBook(query.author, query.title, index)
    };

    // useEffect(() => {
    //     console.log('curr page', currentPage)
    //     console.log('total pages', totalPages)
    // }, [currentPage, totalPages])

    return (
        <div>
            <ReactPaginate
                pageCount={totalPages}
                forcePage={currentPage}
                onPageChange={handlePageChange}
                breakLabel={"..."}
                // center numbers - how many : ...4 5 6 ...
                pageRangeDisplayed={3}
                // margin numbers: 1 ... 4 5 6 ... 10
                marginPagesDisplayed={1}
                previousLabel={<ChevronLeftIcon className="w-6 h-6" />}
                nextLabel={<ChevronRightIcon className="w-6 h-6" />}
                containerClassName={`${totalPages > 1 ? 'flex items-center justify-center mt-8 mb-4' : 'hidden'}`}
                pageClassName={'p-2 hover:text-link-active'}
                previousClassName={`${totalPages > 0 ? 'hover:text-link-active' : 'hidden'}`}
                nextClassName={`${totalPages > 0 ? 'hover:text-link-active' : 'hidden'}`}
                activeClassName={'font-bold text-text'}
            />
        </div>
    )
}
export default ResultsPagination

ResultsPagination.propTypes = {
    query: PropTypes.object,
    searchBook: PropTypes.func,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func
}