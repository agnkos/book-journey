import { XMarkIcon } from "@heroicons/react/24/outline"
import { useRef } from "react";
import PropTypes from 'prop-types';
import EditModalForm from "./EditModalForm";

type BookDetailType = {
    author: string,
    averageRating: number,
    categories: string[],
    description: string,
    endDate: Date | null,
    favourite: boolean,
    googleBookId: string,
    imageUrl: string,
    isbn: string,
    moodsPercentages: object,
    moodsScores: object,
    publishedDate: string,
    review: { score: number, comment: string }
    startDate: Date | null,
    status: string,
    title: string,
    volumeInfo: { title: string, authors: string[] }
}

type EditModalProps = {
    closeModal: () => void,
    bookDetail: BookDetailType,
    id: string,
    refreshBookDetail: (id: string) => void
}

const EditModal = ({ closeModal, bookDetail, id, refreshBookDetail }: EditModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const handleOuterClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!modalRef?.current?.contains(e.target as Node)) {
            closeModal()
        }
    }

    console.log('book details', bookDetail)
    return (
        <div onClick={handleOuterClick} className='fixed top-0 left-0 py-8 flex justify-center items-start w-full h-full bg-text-faded/50 z-30 overflow-y-auto'>
            {/* max-h-full overflow-y-auto */}
            <div ref={modalRef} className="w-11/12 max-w-md flex flex-col bg-light-bg rounded-md z-50">
                <div className="flex p-6 gap-4 bg-main-accent text-light-bg justify-between">
                    <div>
                        <p className="text-xl font-semibold">{bookDetail.title || bookDetail.volumeInfo.title}</p>
                        <p>{bookDetail.author || bookDetail.volumeInfo.authors[0]}</p>
                    </div>
                    <div>
                        <XMarkIcon className="grow block w-6 h-6 cursor-pointer stroke-light-bg hover:stroke-danger hover:ring-offset-2 hover:ring-offset-main-accent hover:ring-2 hover:ring-danger rounded-full transition duration-150"
                            onClick={closeModal}
                        />
                    </div>
                </div>
                <div className="p-6">
                    <EditModalForm bookDetail={bookDetail} closeModal={closeModal} id={id} refreshBookDetail={refreshBookDetail} />
                </div>

            </div>
        </div>
    )
}
export default EditModal

EditModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    bookDetail: PropTypes.object.isRequired,
    id: PropTypes.string,
    refreshBookDetail: PropTypes.func
}