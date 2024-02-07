import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useAuth } from "../hooks/useAuth"

const BookContext = createContext(null)

export const BookContextProvider = ({ children }) => {
    const [books, setBooks] = useState()
    const { user } = useAuth()

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book/all_books', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const data = await response.json()
                console.log(data)
                setBooks(data)
            } catch (error) {
                console.log(error)
            }
        }
        getBooks()
    }, [user.token, setBooks])

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