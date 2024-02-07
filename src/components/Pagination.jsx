import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({ results, setResults }) => {
    const [currentPage, setCurrentPage] = useState(0)
    // const [totalPages, setTotalPages] = useState(Math.ceil(results?.totalItems / 20))

    const totalPages = Math.ceil(results?.totalItems / 20)

    const fetchResults = async (index) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=$1984+inauthor:orwell&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=20&startIndex=${index}`)
            const data = await response.json()
            console.log(data)
            setResults(data)
            console.log('dataitems', data.items)
        } catch (err) {
            console.log(err)
        }
    }

    //    const fetchPage = (index) => {
    //     try {
    //       await  func(index)
    //     }
    //  }

    const handlePageChange = (selectedPage) => {
        console.log('selected page', selectedPage)
        setCurrentPage(selectedPage.selected + 1);
        const index = (currentPage + 1) * 20 - 20
        console.log('index', index)
        fetchResults(index)

    };

    useEffect(() => {
        console.log('currrent page', currentPage)
        console.log('total pages', totalPages)
        console.log('blabla')
    }, [currentPage, totalPages])

    return (
        <div>
            <ReactPaginate
                pageCount={totalPages}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                breakLabel={"..."}
                pageRangeDisplayed={2}
                containerClassName={'flex items-center justify-center mt-8 mb-4'}
                pageClassName={'p-2 hover:text-link-active'}
                previousClassName={'hover:text-link-active'}
                nextClassName={'hover:text-link-active'}
            />
        </div>
    )
}
export default Pagination

Pagination.propTypes = {
    results: PropTypes.object,
    setResults: PropTypes.func
}