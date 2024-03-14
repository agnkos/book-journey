import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useAuth } from "../hooks/useAuth"
import booksService from '../services/books'
import axios from 'axios'

const BookContext = createContext(null)

export const BookContextProvider = ({ children }) => {
    const [books, setBooks] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        if (user?.token) {
            refreshBooks()
        }
    }, [user.token])

    useEffect(() => {
        console.log('books from context', books)
    }, [books])

    const refreshBooks = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser'))?.token}`
        const data = await booksService.getBooks()
        setBooks(data)
        setIsLoading(false)
    }

    return (
        <BookContext.Provider value={{ books, setBooks, refreshBooks, isLoading }}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContext

BookContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}