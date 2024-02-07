import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useAuth } from "../../../hooks/useAuth"
import { HeartIcon, ShareIcon, TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

const BookDetail = () => {
    const [bookDetail, setBookDetail] = useState()
    const [details, setDetails] = useState(true)
    const { user } = useAuth()
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const getBooksDetail = async () => {
            try {
                const response = await fetch(`https://book-journey-app-54dba2b08eec.herokuapp.com/book/${params.id}/details`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const data = await response.json()
                console.log(data)
                setBookDetail(data)
            } catch (error) {
                console.log(error)
            }
        }
        getBooksDetail()
    }, [])

    return (
        <div className="p-4">
            BookDetail
            <p>this is book page id {params.id}</p>
            <div onClick={() => navigate(-1)} className="flex gap-1 items-center cursor-pointer">
                <ChevronLeftIcon className="w-5 h-5" />
                <p>back to books</p>
            </div>
            {bookDetail &&
                <div>
                    <div className="flex gap-4">
                        <img src={bookDetail.imageUrl} alt={`cover of ${bookDetail.title} book`} className="rounded-lg w-32 h-44 object-cover" />
                        <div className="py-2">
                            <p className="text-xl font-semibold">{bookDetail.title}</p>
                            <p className="text-text-faded">{bookDetail.author}</p>
                            <p>{bookDetail.averageRating}</p>
                        </div>
                    </div>
                    <div className="flex justify-between px-4 py-2">
                        <div className="flex gap-1 items-center">
                            <HeartIcon className="w-5 h-5 text-text-faded " /><p className="text-text-faded"> like</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <ShareIcon className="w-5 h-5 text-text-faded " /><p className="text-text-faded"> share</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <TrashIcon className="w-5 h-5 text-text-faded " /><p className="text-text-faded"> delete</p>
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 border-b border-b-text-faded mb-2">
                            <div className={`pb-1 text-center cursor-pointer ${details ? 'border-b border-b-main-accent text-main-accent' : ''}`}
                                onClick={() => setDetails(true)}
                            >Details</div>
                            <div className={`pb-1 text-center cursor-pointer ${details ? '' : 'border-b border-b-main-accent text-main-accent'}`}
                                onClick={() => setDetails(false)}
                            >Info</div>
                        </div>

                        {details && <div>
                            <p className="text-sm text-text-faded">Status</p>
                            <p className="mb-2">{bookDetail.status.toLowerCase()}</p>
                            <p className="text-sm text-text-faded">My rating</p>
                            <p className="mb-2">{bookDetail.review.score}</p>
                            <p className="text-sm text-text-faded">My review</p>
                            <p className="mb-2">{bookDetail.review.comment}</p>
                            <p className="text-sm text-text-faded">Start date</p>
                            <p className="mb-2">{bookDetail.startDate || '-'}</p>
                            <p className="text-sm text-text-faded">Finish date</p>
                            <p className="mb-2">{bookDetail.endDate || '-'}</p>
                        </div>}
                        {!details && <div>
                            <p className="text-sm text-text-faded">Categories</p>
                            <p className="mb-2">{bookDetail.categories || '-'}</p>
                            <p className="text-sm text-text-faded">Description</p>
                            <p className="mb-2">{bookDetail.description}</p>
                        </div>}
                    </div>
                </div>
            }
        </div>
    )
}
export default BookDetail