import { XMarkIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';
import { Formik, Form } from "formik";
import RadioButton from "../../AddBookPage/components/RadioButton";
import bookService from '../../../../services/books'
import { toast } from 'react-toastify'
import { BookType } from "../../../../types";

type MoodModalProps = {
    closeModal: () => void,
    book: BookType
}

type MoodModalFormValuesType = {
    mood: string
}

const MoodModal = ({ closeModal, book }: MoodModalProps) => {

    const initialValues = {
        mood: ''
    }

    const onSubmit = async (values: MoodModalFormValuesType) => {
        const bookData = {
            title: book.title,
            author: book.author,
            mood: values.mood.toUpperCase(),
            status: 'READING',
            googleBookId: book.googleBookId
        }
        try {
            await bookService.editBookDetail(book.id, bookData)
            closeModal()
            toast.success('Mood added')
        } catch (error) {
            console.log(error)
            toast.error('Adding mood failed')
        }
    }

    return (
        <div className='fixed top-0 left-0 py-8 flex justify-center items-start w-full h-full bg-text-faded/50 z-30 overflow-y-auto'>
            <div className="w-11/12 max-w-md flex flex-col bg-light-bg rounded-md z-50">
                <div className="flex p-6 gap-4 bg-main-accent text-light-bg justify-between">
                    <div>
                        <p className="text-xl font-semibold">{book.title}</p>
                        <p>{book.author}</p>
                    </div>
                    <div>
                        <XMarkIcon className="grow block w-6 h-6 cursor-pointer stroke-light-bg hover:stroke-danger hover:ring-offset-2 hover:ring-offset-main-accent hover:ring-2 hover:ring-danger rounded-full transition duration-150"
                            onClick={closeModal}
                        />
                    </div>
                </div>
                <div className="p-6">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {() => (
                            <Form>
                                <p id="mood-group" className="font-semibold">Add mood</p>
                                <div role="group" aria-labelledby="mood-group" className="flex flex-col mb-3">
                                    <RadioButton label="happy" value="happy" name="mood" />
                                    <RadioButton label="sad" value="sad" name="mood" />
                                    <RadioButton label="scared" value="scared" name="mood" />
                                    <RadioButton label="intrigued" value="intrigued" name="mood" />
                                    <RadioButton label="relaxed" value="relaxed" name="mood" />
                                    <RadioButton label="tense" value="tense" name="mood" />
                                    <RadioButton label="in love" value="in_love" name="mood" />
                                    <RadioButton label="nostalgic" value="nostalgic" name="mood" />
                                </div>
                                <div className='flex justify-evenly mt-6'>
                                    <button className="px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent text-light-bg rounded-md transition duration-15"
                                        type="submit"
                                    >Add mood</button>
                                    <button className="px-4 py-2 text-center bg-danger hover:bg-danger-hover text-light-bg rounded-md transition duration-15"
                                        onClick={closeModal}
                                    >Cancel</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

            </div>
        </div>
    )
}
export default MoodModal

MoodModal.propTypes = {
    closeModal: PropTypes.func,
    book: PropTypes.object
}