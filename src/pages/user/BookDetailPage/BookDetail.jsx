import { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import BookDetailElement from "./components/BookDetailElement"
import bookService from '../../../services/books'
// import axios from 'axios'

const BookDetail = () => {
    const [bookDetail, setBookDetail] = useState()
    const { user } = useAuth()
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    console.log('bookdetail', bookDetail)

    useEffect(() => {
        if (user?.token) {
            console.log('refreshing details')
            refreshBookDetail(params.id)

        }
    }, [params.id, user.token])

    const refreshBookDetail = async (id) => {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser'))?.token}`
        const data = await bookService.getBookDetail(id)
        setBookDetail(data)
    }
    console.log('location', location.state)

    return (
        <div className="p-4">
            <div onClick={() => navigate(-1)} className="mb-3 flex gap-1 hover:text-link-active items-center font-semibold cursor-pointer transition delay-150">
                <ChevronLeftIcon className="w-5 h-5" />
                <p>back to {location?.state === '/favourites' ? 'favourites' : location?.state?.includes('/books') ? 'books' : location?.state === '/search' ? 'search' : location?.state === '/addbook' ? 'adding book' : location?.state === '/dashboard' ? 'dashboard' : ''}</p>
            </div>
            {bookDetail &&
                <BookDetailElement bookDetail={bookDetail} id={params.id} setBookDetail={setBookDetail} />
            }
        </div>
    )
}
export default BookDetail