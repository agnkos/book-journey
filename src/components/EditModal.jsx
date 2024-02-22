import { XMarkIcon } from "@heroicons/react/24/outline"
import { useRef } from "react";
import PropTypes from 'prop-types';
import EditModalForm from "./EditModalForm";

const EditModal = ({ closeModal, bookDetail, id }) => {
    const modalRef = useRef()
    const handleOuterClick = (e) => {
        if (!modalRef.current.contains(e.target)) {
            closeModal()
        }
    }

    console.log('book details', bookDetail)
    return (
        <div onClick={handleOuterClick} className='fixed top-0 left-0 py-8 flex justify-center items-center w-full h-full bg-text-faded/50 z-30'>
            <div ref={modalRef} className="w-11/12 max-w-md max-h-full flex flex-col bg-light-bg rounded-md z-50 overflow-y-auto">
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
                    <EditModalForm bookDetail={bookDetail} closeModal={closeModal} id={id} />
                </div>

            </div>
        </div>
    )
}
export default EditModal

EditModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    bookDetail: PropTypes.object.isRequired,
    id: PropTypes.string
}