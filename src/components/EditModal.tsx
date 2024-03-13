import { XMarkIcon } from "@heroicons/react/24/outline"
import { useRef } from "react";
import PropTypes from 'prop-types';
import EditModalForm from "./EditModalForm";
import { BookDetailType } from "../types";

type EditModalProps = {
    closeModal: () => void,
    bookDetail: Partial<BookDetailType>,
    id: string,
    refreshBookDetail: (id: string) => void
}

const EditModal = ({ closeModal, bookDetail, id, refreshBookDetail }: EditModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    // const handleOuterClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    //     // as Node -> checking if e.target is modalRef child
    //     if (!modalRef?.current?.contains(e.target as Node)) {
    //         closeModal()
    //     }
    // }
    const handleOuterClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // as Node -> checking if e.target is modalRef child
        if (!modalRef?.current?.contains(event.target as Node)) {
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
                        <p className="text-xl font-semibold">{bookDetail.title || bookDetail?.volumeInfo?.title}</p>
                        <p>{bookDetail.author || bookDetail?.volumeInfo?.authors[0]}</p>
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