import { XMarkIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';
import { useContext, useRef } from "react";
import BookContext from "../context/BookContext";
import { useNavigate } from "react-router-dom";
import bookService from '../services/books'
import { toast } from 'react-toastify'

type DeleteModalProps = {
    closeModal: () => void,
    id: string
}

const DeleteModal = ({ closeModal, id }: DeleteModalProps) => {
    const { refreshBooks } = useContext(BookContext)
    const navigate = useNavigate()
    const modalRef = useRef<HTMLDivElement>(null)

    const handleDelete = async (id: string) => {
        await bookService.deleteBook(id)
        await refreshBooks()
        closeModal()
        navigate(-1)
        toast.success('Book deleted')
    }

    const handleOuterClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!modalRef?.current?.contains(e.target as Node)) {
            closeModal()
        }
    }

    return (
        <div onClick={handleOuterClick} className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-text-faded/50 z-30'>
            <div ref={modalRef} className="w-9/12 max-w-xs p-6 flex flex-col gap-4 bg-light-bg rounded-md z-50">
                <div>
                    <XMarkIcon className="w-6 h-6 ml-auto cursor-pointer stroke-text hover:stroke-danger hover:ring-offset-2 hover:ring-2 ring-danger rounded-full transition duration-150"
                        onClick={closeModal}
                    />
                </div>
                <p className="text-center">Are you sure you want to delete this book?</p>
                <div className='flex justify-evenly'>
                    <button className="px-4 py-2 text-center bg-danger hover:bg-danger-hover text-light-bg rounded-md transition duration-15"
                        onClick={() => handleDelete(id)}
                    >Delete</button>
                    <button className="px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent text-light-bg rounded-md transition duration-15"
                        onClick={closeModal}
                    >Cancel</button>
                </div>

            </div>
        </div>
    )
}
export default DeleteModal

DeleteModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}