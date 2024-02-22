import { Formik, Form } from "formik";
import PropTypes from 'prop-types';
import { useCallback, useContext } from "react";
// import * as Yup from "yup";
// import TextField from "../pages/user/AddBookPage/components/TextField";
import BookContext from "../context/BookContext";
import RadioButton from "../pages/user/AddBookPage/components/RadioButton";
import RangeFieldEl from "../pages/user/AddBookPage/components/RangeFieldEl";
import CheckboxField from "../pages/user/AddBookPage/components/CheckboxField";
import TextareaField from "../pages/user/AddBookPage/components/TextareaField";
import DateElement from "../pages/user/AddBookPage/components/DateElement";
import booksService from '../services/books';
import { useLocation, useNavigation } from "react-router-dom";

const moodOptions = [
    { label: 'In love', value: 'in_love' },
    { label: 'Happy', value: 'happy' },
    { label: 'Intrigued', value: 'intrigued' },
    { label: 'Tense', value: 'tense' },
    { label: 'Scared', value: 'scared' },
    { label: 'Relaxed', value: 'relaxed' },
    { label: 'Nostalgic', value: 'nostalgic' },
    { label: 'Sad', value: 'sad' },
];

const EditModalForm = ({ bookDetail, closeModal, id }) => {
    const { refreshBooks } = useContext(BookContext)
    const location = useLocation()
    const navigate = useNavigation()

    console.log('location', location)
    console.log('book detail from edit form', bookDetail)

    const initialValues = {
        title: location.pathname === '/search' ? bookDetail.volumeInfo.title : bookDetail.title,
        author: location.pathname === '/search' ? bookDetail.volumeInfo.authors[0] : bookDetail.author,
        status: location.pathname === '/search' ? 'read' : (bookDetail.status === 'READ' ? 'read' : bookDetail.status === 'READING' ? 'reading' : 'to read'),
        rate: location.pathname === '/search' ? '' : bookDetail.review.score,
        review: location.pathname === '/search' ? '' : bookDetail.review.comment,
        moods: [],
        mood: '',
        moodsrate: { in_love: 1, happy: 1, relaxed: 1, intrigued: 1, scared: 1, tense: 1, nostalgic: 1, sad: 1 },
        startDate: location.pathname === '/search' ? '' : bookDetail.startDate,
        endDate: location.pathname === '/search' ? '' : bookDetail.endDate
    }

    const onSubmit = useCallback(async (values, { resetForm, setStatus, setValues }) => {
        const moodsPercentages = {}
        for (const [key, value] of Object.entries(values.moodsrate)) {
            if (values.status === "read" && values.moods.includes(key)) {
                moodsPercentages[`${key}`.toUpperCase()] = value
            }
        }
        const readingBook = {
            title: values.title,
            author: values.author,
            mood: values.mood.toUpperCase(),
            startDate: values.startDate,
            status: values.status.toUpperCase()
        }

        const toReadBook = {
            title: values.title,
            author: values.author,
            status: 'GOING_TO_READ'
        }
        const readBook = {
            title: values.title,
            author: values.author,
            status: values.status.toUpperCase(),
            review: {
                score: values.rate,
                comment: values.review
            },
            moods: { moodsPercentages: moodsPercentages },
            startDate: values.startDate,
            endDate: values.endDate
        }

        const bookData = values.status === "read" ? readBook : values.status === "reading" ? readingBook : toReadBook


        try {
            if (location.pathname === '/search') await booksService.addBook(bookData)
            // else await booksService.editBookDetail(id, bookData)
            refreshBooks()
            resetForm()
            setValues({
                ...values,
                title: '',
                author: '',
                rate: '',
                moodsrate: { in_love: 1, happy: 1, relaxed: 1, intrigued: 1, scared: 1, tense: 1, nostalgic: 1, sad: 1 },
                moods: [],
            });
            console.log('book edited', bookData)
            closeModal()
            // if edit:
            // navigate(`books/${id}`)
        } catch (error) {
            console.log(error)
            setStatus({ response: error.response.data.message })
        }
    }, [refreshBooks, closeModal, location.pathname])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => onSubmit(values, actions)}
        // validationSchema={validationSchema}
        >
            {({ values }) => {
                return (
                    <Form>
                        <p id="status-group" className="font-semibold">Status</p>
                        <div role="group" aria-labelledby="status-group" className="mb-3">
                            <RadioButton name="status" value="read"
                                label="Read" />
                            <RadioButton name="status" value="reading"
                                label="Reading" />
                            <RadioButton name="status" value="to read"
                                label="To read" />
                        </div>

                        {values.status === "read" &&
                            <>
                                <div className="mb-3">
                                    <label className="font-semibold">Rate
                                        <RangeFieldEl name="rate" values={values} />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <TextareaField name="review" label="Review" />
                                </div>

                                <div id="moods-group" className="font-semibold">Moods</div>
                                <div role="group" aria-labelledby="moods-group" className="flex flex-col mb-3">

                                    {moodOptions.map((moodOption) => (
                                        <div key={moodOption.value} className="flex gap-4 max-[390px]:gap-2">
                                            <CheckboxField name="moods" value={moodOption.value} label={moodOption.label} />
                                            {values.moods.includes(moodOption.value) && (
                                                <RangeFieldEl name={`moodsrate.${moodOption.value}`} values={values} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        }

                        {values.status === "reading" &&
                            <>
                                <p id="mood-group" className="font-semibold">Mood</p>
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
                            </>
                        }

                        {["reading", "read"].includes(values.status) &&
                            <DateElement name="startDate" label="Start date" values={values} />}

                        {values.status === "read" &&
                            <DateElement name="endDate" label="Finish date" values={values} />}

                        <div className='flex justify-evenly mt-6'>
                            <button className="px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent text-light-bg rounded-md transition duration-15"
                                type="submit"
                            >{location.pathname === '/search' ? 'Add book' : 'Save'}</button>
                            <button className="px-4 py-2 text-center bg-danger hover:bg-danger-hover text-light-bg rounded-md transition duration-15"
                                onClick={closeModal}
                            >Cancel</button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default EditModalForm

EditModalForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
    bookDetail: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
}