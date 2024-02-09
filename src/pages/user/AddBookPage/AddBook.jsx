import { useAuth } from "../../../hooks/useAuth";
import { addBook } from "../../../helpers/requests";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./components/TextField";
import RadioButton from "./components/RadioButton";
import RangeFieldEl from "./components/RangeFieldEl";
import CheckboxField from "./components/CheckboxField";
import TextareaField from "./components/TextareaField";
import DateElement from "./components/DateElement";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

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

const AddBook = () => {
    const { user } = useAuth()
    const { state } = useLocation()

    const initialValues = {
        title: state?.title || '',
        author: state?.author[0] || '',
        status: 'read',
        rate: 0,
        review: '',
        moods: [],
        mood: null,
        moodsrate: { in_love: 1, happy: 1, relaxed: 1, intrigued: 1, scared: 1, tense: 1, nostalgic: 1, sad: 1 },
        startDate: null,
        endDate: null
    }

    console.log('initial values', initialValues)

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
    })

    const onSubmit = useCallback(async (values, { resetForm, setStatus }) => {
        console.log('values', values)
        const moodsPercentages = {}
        for (const [key, value] of Object.entries(values.moodsrate)) {
            if (values.status === "read" && values.moods.includes(key)) {
                moodsPercentages[`${key}`.toUpperCase()] = value
            }
        }

        const readingBook = {
            title: values.title,
            author: values.author,
            mood: values.mood,
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
            await addBook(bookData, user.token)
            resetForm()
        } catch (e) {
            console.log('error from onsubmit', e)
            setStatus({ response: e.message })
        }
    }, [user.token])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">Add Book</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => onSubmit(values, actions)}
                validationSchema={validationSchema}
            >
                {({ values, status }) => {
                    console.log('form values', values)
                    return (
                        <Form>
                            <TextField name="title" label="Title" />
                            <TextField name="author" label="Author" />

                            <div id="start" className="text-md font-semibold text-red-500">{status?.response}</div>

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
                                            <div key={moodOption.value} className="flex gap-4">
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

                            <button type="submit"
                                className="px-4 py-2 mt-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md"
                            >Add book</button>
                        </Form>
                    )
                }}
            </Formik>
        </div >
    )
}

export default AddBook