import { XMarkIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';
import { deleteBook, getBooks } from "../helpers/requests";
import { useAuth } from "../hooks/useAuth";
import { useContext } from "react";
import BookContext from "../context/BookContext";
import { useNavigate } from "react-router-dom";

const Modal = ({ closeModal, id }) => {
    const { user } = useAuth()
    const { setBooks } = useContext(BookContext)
    const navigate = useNavigate()

    const handleDelete = async (id, token, func) => {
        console.log('book id', id)
        await deleteBook(id, token)
        await getBooks(func, token)
        closeModal()
        navigate(-1)
    }

    return (
        <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-text-faded/50 z-50'>
            <div className="w-9/12 max-w-xs p-6 flex flex-col gap-4 bg-light-bg rounded-md">
                <div className="" onClick={closeModal}>
                    <XMarkIcon className="w-6 h-6 ml-auto cursor-pointer stroke-text hover:stroke-danger hover:ring-offset-2 hover:ring-2 ring-danger rounded-full transition duration-150" />
                </div>
                <p className="text-center">Are you sure you want to delete this book?</p>
                <div className='flex justify-evenly'>
                    <button className="px-4 py-2 text-center bg-danger hover:bg-danger-hover text-light-bg rounded-md transition duration-15"
                        onClick={() => handleDelete(id, user.token, setBooks)}
                    >Delete</button>
                    <button className="px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent text-light-bg rounded-md transition duration-15"
                        onClick={closeModal}
                    >Cancel</button>
                </div>

            </div>
        </div>
    )
}
export default Modal

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}