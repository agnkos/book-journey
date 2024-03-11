import { Formik, Form } from "formik";
import PropTypes from 'prop-types';
import { useCallback, useContext } from "react";
import BookContext from "../context/BookContext";
import RadioButton from "../pages/user/AddBookPage/components/RadioButton";
import RangeFieldEl from "../pages/user/AddBookPage/components/RangeFieldEl";
import CheckboxField from "../pages/user/AddBookPage/components/CheckboxField";
import TextareaField from "../pages/user/AddBookPage/components/TextareaField";
import DateElement from "../pages/user/AddBookPage/components/DateElement";
import booksService from '../services/books';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

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

const EditModalForm = ({ bookDetail, closeModal, id, refreshBookDetail }) => {
    const { refreshBooks } = useContext(BookContext)
    const location = useLocation()
    const navigate = useNavigate()

    const search = location.pathname === '/search'

    const initialValues = {
        title: search ? bookDetail.volumeInfo.title : bookDetail.title,
        author: search ? bookDetail.volumeInfo.authors[0] : bookDetail.author,
        status: search ? 'read' : (bookDetail.status === 'READ' ? 'read' : bookDetail.status === 'READING' ? 'reading' : 'to read'),
        rate: search ? '' : bookDetail.review.score,
        review: search ? '' : bookDetail.review.comment,
        moods: search ? '' : Object.keys(bookDetail?.moodsPercentages).map(key => key.toLowerCase()),
        mood: '',
        moodsrate: {
            in_love: bookDetail?.moodsScores?.IN_LOVE || 1,
            happy: bookDetail?.moodsScores?.HAPPY || 1,
            relaxed: bookDetail?.moodsScores?.RELAXED || 1,
            intrigued: bookDetail?.moodsScores?.INTRIGUED || 1,
            scared: bookDetail?.moodsScores?.SCARED || 1,
            tense: bookDetail?.moodsScores?.TENSE || 1,
            nostalgic: bookDetail?.moodsScores?.NOSTALGIC || 1,
            sad: bookDetail?.moodsScores?.SAD || 1
        },
        startDate: search ? '' : Date.parse(bookDetail.startDate),
        endDate: search ? '' : Date.parse(bookDetail.endDate)
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
            mood: values.mood.toUpperCase() || null,
            startDate: values.startDate || null,
            status: values.status.toUpperCase(),
            googleBookId: bookDetail.id
        }

        const toReadBook = {
            title: values.title,
            author: values.author,
            status: 'GOING_TO_READ',
            googleBookId: bookDetail.id
        }
        const readBook = {
            title: values.title,
            author: values.author,
            moods: moodsPercentages,
            review: {
                score: values.rate,
                comment: values.review
            },
            startDate: values.startDate || null,
            endDate: values.endDate || null,
            status: values.status.toUpperCase(),
            googleBookId: bookDetail.id
        }

        const bookData = values.status === "read" ? readBook : values.status === "reading" ? readingBook : toReadBook

        try {
            if (location.pathname === '/search') {
                await booksService.addBook(bookData)
                const books = await booksService.getBooks()
                const bookFiltered = books[bookData.status].filter(book => book.googleBookId === bookDetail.id)[0]
                navigate(`/books/${bookFiltered.id}`, { state: location.pathname })
                toast.success('Book added')
            }
            else {
                await booksService.editBookDetail(id, bookData)
                await refreshBookDetail(id)
                toast.success('Book edited')
            }
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
            console.log('Book edited', bookData)
            closeModal()
        } catch (error) {
            console.log(error)
            toast.error('Error')
            setStatus({ response: error.response.data.message || error.response.data.title })
        }
    }, [refreshBooks, closeModal, location.pathname, id, refreshBookDetail, bookDetail.id, navigate])


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => onSubmit(values, actions)}
        >
            {({ values }) => {
                console.log('values', values)
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
                            </>
                        }
                        {["read"].includes(values.status) &&
                            <>
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
                            </>}


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
    id: PropTypes.string,
    refreshBookDetail: PropTypes.func
}