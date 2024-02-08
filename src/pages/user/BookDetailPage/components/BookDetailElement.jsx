import { HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useState } from "react"
import StarRating from "./StarRating"
import PropTypes from 'prop-types';

const BookDetailElement = ({ bookDetail }) => {
    const [details, setDetails] = useState(true)

    return (
        <>
            <div className="flex gap-4">
                <img src={bookDetail.imageUrl} alt={`cover of ${bookDetail.title} book`} className="rounded-lg w-32 h-44 object-cover" />
                <div className="py-2">
                    <p className="text-xl font-semibold">{bookDetail.title}</p>
                    <p className="text-text-faded">{bookDetail.author}</p>
                    <div className="flex gap-1 items-center">
                        <p className="font-semibold text-lg">{bookDetail.averageRating}</p>
                        {bookDetail.averageRating && <StarRating bookDetail={bookDetail} />
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-between px-4 py-4">
                <div className="flex gap-1 items-center group cursor-pointer">
                    <HeartIcon className="w-5 h-5 text-text-faded group-hover:stroke-link-active-hover" />
                    <p className="text-text-faded group-hover:text-link-active-hover"> favourites</p>
                </div>
                <div className="flex gap-1 items-center group cursor-pointer">
                    <ShareIcon className="w-5 h-5 text-text-faded group-hover:stroke-link-active-hover" /><p className="text-text-faded group-hover:text-link-active-hover"> share</p>
                </div>
                <div className="flex gap-1 items-center group cursor-pointer">
                    <TrashIcon className="w-5 h-5 text-text-faded group-hover:stroke-link-active-hover" /><p className="text-text-faded group-hover:text-link-active-hover"> delete</p>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-2 border-b border-b-text-faded font-semibold mb-2">
                    <div className={`pb-1 text-center cursor-pointer ${details ? 'border-b-2 border-b-main-accent text-main-accent' : ''}`}
                        onClick={() => setDetails(true)}
                    >Details</div>
                    <div className={`pb-1 text-center cursor-pointer ${details ? '' : 'border-b-2 border-b-main-accent text-main-accent'}`}
                        onClick={() => setDetails(false)}
                    >Info</div>
                </div>

                {details && <div>
                    <p className="text-sm text-text-faded">Status</p>
                    <p className="mb-2">{bookDetail.status.toLowerCase()}</p>
                    <p className="text-sm text-text-faded">My rating</p>
                    <p className="mb-2">{bookDetail.review.score}</p>
                    <p className="text-sm text-text-faded">My review</p>
                    <p className="mb-2">{bookDetail.review.comment || '-'}</p>
                    <p className="text-sm text-text-faded">Start date</p>
                    <p className="mb-2">{bookDetail.startDate || '-'}</p>
                    <p className="text-sm text-text-faded">Finish date</p>
                    <p className="mb-2">{bookDetail.endDate || '-'}</p>

                    <Link to={``}
                        className=''
                    >
                        <button className="mt-4 px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md block">Edit</button>
                    </Link>
                </div>}

                {!details && <div>
                    <p className="text-sm text-text-faded">Categories</p>
                    <p className="mb-2">{bookDetail.categories || '-'}</p>
                    <p className="text-sm text-text-faded">Description</p>
                    <p className="mb-2">{bookDetail.description}</p>
                </div>}
            </div>
        </>
    )
}
export default BookDetailElement

BookDetailElement.propTypes = {
    bookDetail: PropTypes.object
}