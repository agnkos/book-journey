import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useAuth } from "../hooks/useAuth"
import { getBooks } from "../helpers/requests";

const BookContext = createContext(null)

export const BookContextProvider = ({ children }) => {
    const [books, setBooks] = useState()
    const { user } = useAuth()

    useEffect(() => {
        getBooks(setBooks, user.token)
        if (user?.token) getBooks()
    }, [user.token])

    return (
        <BookContext.Provider value={{ books, setBooks }}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContext

BookContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}