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

const AddBookVer = () => {
    const { user } = useAuth()

    const initialValues = {
        title: '',
        author: '',
        status: 'read',
        rate: 0,
        review: '',
        moods: [],
        mood: null,
        moodsrate: { in_love: 1, happy: 1, relaxed: 1, intrigued: 1, scared: 1, tense: 1, nostalgic: 1, sad: 1 },
        startDate: null,
        endDate: null
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required')
    })

    const onSubmit = (values, resetForm) => {
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
            // status: values.status.toUpperCase()
            status: 'TO_READ'
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

        console.log(moodsPercentages)
        console.log(bookData)
        addBook(bookData, user.token)
        resetForm()
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">AddBookVer</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                validationSchema={validationSchema}
            >
                {({ values }) => {
                    console.log('form values', values)
                    return (
                        <Form>
                            <TextField name="title" label="Book title" />
                            <TextField name="author" label="Author" />

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

                                        <div className="flex gap-4">
                                            <CheckboxField name="moods" value="in_love" label="In love" />
                                            {values.moods.includes('in_love') &&
                                                <RangeFieldEl name="moodsrate['in_love']" values={values} />
                                            }
                                        </div>

                                        <div className="flex gap-4">
                                            <CheckboxField name="moods" value="happy" label="Happy" />
                                            {values.moods.includes('happy') &&
                                                <RangeFieldEl name="moodsrate.happy" values={values} />}
                                        </div>

                                        <div className="flex gap-4">
                                            <CheckboxField name="moods" value="intrigued" label="Intrigued" />
                                            {values.moods.includes('intrigued') &&
                                                <RangeFieldEl name="moodsrate.intrigued" values={values} />
                                            }
                                        </div>

                                        <div className="flex gap-4">
                                            <CheckboxField name="moods" value="tense" label="Tense" />
                                            {values.moods.includes('tense') &&
                                                <RangeFieldEl name="moodsrate.tense" values={values} />
                                            }
                                        </div>

                                        <div className="flex gap-4">
                                            <CheckboxField name="moods" value="scared" label="Scared" />
                                            {values.moods.includes('scared') &&
                                                <RangeFieldEl name="moodsrate.scared" values={values} />
                                            }
                                        </div>

                                        <div className="flex gap-4">
                                            <CheckboxField name="moods" value="relaxed" label="Relaxed" />
                                            {values.moods.includes('relaxed') &&
                                                <RangeFieldEl name="moodsrate.relaxed" values={values} />
                                            }
                                        </div>

                                        <div className="flex gap-4">
                                            <CheckboxField name="moods" value="nostalgic" label="Nostalgic" />
                                            {values.moods.includes('nostalgic') &&
                                                <RangeFieldEl name="moodsrate.nostalgic" values={values} />
                                            }
                                        </div>

                                        <div className="flex gap-4">
                                            <CheckboxField name="moods" value="sad" label="Sad" />
                                            {values.moods.includes('sad') &&
                                                <RangeFieldEl name="moodsrate.sad" values={values} />
                                            }
                                        </div>
                                    </div>
                                </>
                            }

                            {["reading", "read"].includes(values.status) &&
                                <DateElement name="startDate" label="Start date" values={values} />
                            }

                            {
                                values.status === "read" &&
                                <DateElement name="endDate" label="Finish date" values={values} />
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
export default AddBookVer