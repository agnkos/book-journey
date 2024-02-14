import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useAuth } from "../hooks/useAuth"
import booksService from '../services/books'

const BookContext = createContext(null)

export const BookContextProvider = ({ children }) => {
    const [books, setBooks] = useState()
    const { user } = useAuth()

    useEffect(() => {
        if (user?.token) {
            refreshBooks()
        }
    }, [user?.token])

    useEffect(() => {
        console.log('books from contexxt', books)
    }, [books])

    const refreshBooks = async () => {
        const data = await booksService.getBooks()
        setBooks(data)
    }

    return (
        <BookContext.Provider value={{ books, setBooks, refreshBooks }}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContext

BookContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}