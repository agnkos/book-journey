import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const BooksPagination = ({ totalPages, setCurrentPage }) => {

    const handlePageChange = (selectedPage) => {
        console.log('selected page', selectedPage)
        setCurrentPage(selectedPage.selected + 1)
    }

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
            /></div>
    )
}
export default BooksPagination

BooksPagination.propTypes = {
    totalPages: PropTypes.number,
    setCurrentPage: PropTypes.func
}