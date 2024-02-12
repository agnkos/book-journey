import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { getBookDetail } from "../../../helpers/requests"
import BookDetailElement from "./components/BookDetailElement"

const BookDetail = () => {
    const [bookDetail, setBookDetail] = useState()
    const { user } = useAuth()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBookDetail(params.id, user.token, setBookDetail)
    }, [params.id, user.token])

    return (
        <div className="p-4">
            <div onClick={() => navigate(-1)} className="mb-3 flex gap-1 hover:text-link-active items-center font-semibold cursor-pointer transition delay-150">
                <ChevronLeftIcon className="w-5 h-5" />
                <p>back to books</p>
            </div>
            {bookDetail &&
                <BookDetailElement bookDetail={bookDetail} id={params.id} setBookDetail={setBookDetail}/>
            }
        </div>
    )
}
export default BookDetail