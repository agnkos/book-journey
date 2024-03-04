import { HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline"
// import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import StarRating from "./StarRating"
import PieChart from "./PieChart"
import PropTypes from 'prop-types';
import BookContext from "../../../../context/BookContext"
import booksService from '../../../../services/books'
import EditModal from "../../../../components/EditModal"
import DeleteModal from "../../../../components/DeleteModal"
import BookCoverPlaceholderBig from "../../../../components/BookCoverPlaceholderBig";

const BookDetailElement = ({ bookDetail, setBookDetail, id }) => {
    const [details, setDetails] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const { refreshBooks } = useContext(BookContext)

    const closeDeleteModal = () => setShowDeleteModal(false)
    const openDeleteModal = () => setShowDeleteModal(true)
    const closeEditModal = () => setShowEditModal(false)
    const openEditModal = () => setShowEditModal(true)

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
                {bookDetail.imageUrl ? <img src={bookDetail.imageUrl} alt={`cover of ${bookDetail.title} book`} className="rounded-lg w-32 h-44 object-cover" /> : <BookCoverPlaceholderBig />}
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

            <div className="flex justify-between px-4 py-4 max-[380px]:px-2">
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
                    onClick={openDeleteModal}
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
                    <p className="mb-2">{bookDetail.status === "GOING_TO_READ" ? 'to read' : bookDetail.status.toLowerCase()}</p>
                    {bookDetail.status === "READ" &&
                        <>
                            <p className="text-sm text-text-faded">My rating</p>
                            <p className="mb-2">{bookDetail.review.score}</p>
                            <p className="text-sm text-text-faded">My review</p>
                            <p className="mb-2">{bookDetail.review.comment || '-'}</p>
                        </>}
                    {['READ', 'READING'].includes(bookDetail.status) &&
                        <>
                            <p className="text-sm text-text-faded">Start date</p>
                            <p className="mb-2">{bookDetail.startDate || '-'}</p>
                        </>
                    }
                    {/* {bookDetail.status === "READING" &&
                        <>
                            <p className="text-sm text-text-faded">Mood</p>
                            <p className="mb-2">{bookDetail.mood || '-'}</p>
                        </>
                    } */}
                    {bookDetail.status === "READ" &&
                        <>
                            <p className="text-sm text-text-faded">Finish date</p>
                            <p className="mb-2">{bookDetail.endDate || '-'}</p>
                            {/* <p className="text-sm text-text-faded">Moods</p>
                            {Object.keys(bookDetail.moodPercentages.moodsPercentages).length !== 0 ?
                                <div className="my-2">
                                    <PieChart data={bookDetail.moodPercentages.moodsPercentages} />
                                </div>
                                :
                                <span>-</span>
                            } */}
                        </>}
                    {['READ', 'READING'].includes(bookDetail.status) &&
                        <>
                            <p className="text-sm text-text-faded">Moods</p>
                            {Object.keys(bookDetail.moodPercentages.moodsPercentages).length !== 0 ?
                                <div className="my-2">
                                    <PieChart data={bookDetail.moodPercentages.moodsPercentages} />
                                </div>
                                :
                                <span>-</span>
                            }
                        </>
                    }

                    <button className="mt-6 px-2 py-1 text-center bg-link-active hover:bg-link-active-hover text-light-bg rounded-md block"
                        onClick={openEditModal}

                    >Edit</button>

                </div>}

                {!details && <div>
                    <p className="text-sm text-text-faded">Categories</p>
                    <p className="mb-2">{bookDetail.categories || '-'}</p>
                    <p className="text-sm text-text-faded">Description</p>
                    <p className="mb-2">{bookDetail.description}</p>
                </div>}
            </div>
            {showDeleteModal && <DeleteModal closeModal={closeDeleteModal} id={id} />}
            {showEditModal && <EditModal closeModal={closeEditModal} bookDetail={bookDetail} id={id} refreshBookDetail={refreshBookDetail} />}
        </>
    )
}
export default BookDetailElement

BookDetailElement.propTypes = {
    bookDetail: PropTypes.object,
    setBookDetail: PropTypes.func,
    id: PropTypes.string
}