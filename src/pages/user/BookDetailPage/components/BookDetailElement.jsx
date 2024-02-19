import { HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import StarRating from "./StarRating"
import PieChart from "./PieChart"
import Modal from "../../../../components/Modal"
import PropTypes from 'prop-types';
import BookContext from "../../../../context/BookContext"
import booksService from '../../../../services/books'

const BookDetailElement = ({ bookDetail, setBookDetail, id }) => {
    const [details, setDetails] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const { refreshBooks } = useContext(BookContext)

    const closeModal = () => setShowModal(false)
    const openModal = () => setShowModal(true)

    const handleAddToFavourites = async (id) => {
        await booksService.addToFavourites(id)
        refreshBookDetail(id)
    }

    const refreshBookDetail = async (id) => {
        const data = await booksService.getBookDetail(id)
        setBookDetail(data)
        refreshBooks()
    }

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
                <div className="flex gap-1 items-center group cursor-pointer"
                    onClick={() => handleAddToFavourites(id)}
                >
                    <HeartIcon className={` ${bookDetail.favourite ? 'stroke-main-accent fill-main-accent' : ''} w-5 h-5 text-text-faded group-hover:stroke-link-active-hover group-hover:fill-link-active-hover`} />
                    <p className="text-text-faded group-hover:text-link-active-hover"> favourites</p>
                </div>
                <div className="flex gap-1 items-center group cursor-pointer">
                    <ShareIcon className="w-5 h-5 text-text-faded group-hover:stroke-link-active-hover" /><p className="text-text-faded group-hover:text-link-active-hover"> share</p>
                </div>
                <div className="flex gap-1 items-center group cursor-pointer"
                    onClick={openModal}
                >
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
                    <p className="text-sm text-text-faded">Moods</p>
                    {Object.keys(bookDetail.moods.moodsPercentages).length !== 0 ?
                        <div className="my-2">
                            <PieChart data={bookDetail.moods.moodsPercentages} />
                        </div>
                        :
                        <span>-</span>
                    }
                    <Link to='/addbook'
                        className=''
                    >
                        <button className="mt-6 px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md block">Edit</button>
                    </Link>
                </div>}

                {!details && <div>
                    <p className="text-sm text-text-faded">Categories</p>
                    <p className="mb-2">{bookDetail.categories || '-'}</p>
                    <p className="text-sm text-text-faded">Description</p>
                    <p className="mb-2">{bookDetail.description}</p>
                </div>}
            </div>
            {showModal && <Modal closeModal={closeModal} id={id} />}
        </>
    )
}
export default BookDetailElement

BookDetailElement.propTypes = {
    bookDetail: PropTypes.object,
    setBookDetail: PropTypes.func,
    id: PropTypes.string
}