import { useAuth } from "../../../hooks/useAuth";
import { addBook } from "../../../helpers/requests";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import TextField from "./components/TextField";
import RadioButton from "./components/RadioButton";

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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">AddBookVer</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    // console.log('moods', values.moods)
                    const moodsPercentages = {}
                    for (const [key, value] of Object.entries(values.moodsrate)) {
                        if (values.status === "read" && values.moods.includes(key)) {
                            // console.log(value)
                            moodsPercentages[`${key}`.toUpperCase()] = value
                        }
                    }
                    const bookData = {
                        title: values.title,
                        author: values.author,
                        status: values.status.toUpperCase(),
                        review: {
                            score: values.rate,
                            comment: values.review
                        },
                        mood: values.mood,
                        moods: { moodsPercentages: moodsPercentages },
                        startDate: values.startDate,
                        endDate: values.endDate
                    }
                    console.log(moodsPercentages)
                    console.log(bookData)
                    addBook(bookData, user.token)
                }}
            >
                {({ values, setFieldValue }) => {
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
                                    <div className="flex">
                                        <label>Rate
                                            <div className="flex gap-2 mb-2">
                                                <Field
                                                    type="range"
                                                    name="rate"
                                                    min="1"
                                                    max="10"
                                                    // step="1"
                                                    className="w-11/12 rounded-md border" />
                                                <span>{values.rate}</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div>
                                        <label>Review
                                            <Field
                                                type="text"
                                                as="textarea"
                                                name="review"
                                                className="w-11/12 mb-2 px-4 py-2 rounded-md border resize-none" />
                                        </label>
                                    </div>

                                    <div id="moods-group">Moods</div>
                                    <div role="group" aria-labelledby="moods-group" className="flex flex-col mb-2">

                                        <div className="flex gap-4">
                                            <label className="mr-1">
                                                <Field type="checkbox" name="moods" value="in_love" className="mr-2" />
                                                In love
                                            </label>
                                            {values.moods.includes('in_love') &&
                                                <div className="flex gap-2">
                                                    <Field
                                                        type="range"
                                                        name="moodsrate['in_love']"
                                                        min="1"
                                                        max="10"
                                                    />
                                                    <span>{values.moodsrate['in_love']}</span>
                                                </div>}
                                        </div>

                                        <div className="flex gap-4">
                                            <label>
                                                <Field type="checkbox" name="moods" value="happy" className="mr-2" />
                                                happy
                                            </label>
                                            {values.moods.includes('happy') &&
                                                <div className="flex gap-2">
                                                    <Field
                                                        type="range"
                                                        name="moodsrate.happy"
                                                        min="1"
                                                        max="10"
                                                    />
                                                    <span>{values.moodsrate.happy}</span>
                                                </div>}
                                        </div>

                                        <div className="flex gap-4">
                                            <label>
                                                <Field type="checkbox" name="moods" value="intrigued" className="mr-2" />
                                                intrigued
                                            </label>
                                            {values.moods.includes('intrigued') &&
                                                <div className="flex gap-2">
                                                    <Field
                                                        type="range"
                                                        name="moodsrate.intrigued"
                                                        min="1"
                                                        max="10"
                                                    />
                                                    <span>{values.moodsrate.dreamy}</span>
                                                </div>}
                                        </div>

                                        <div className="flex gap-4">
                                            <label>
                                                <Field type="checkbox" name="moods" value="tense" className="mr-2" />
                                                tense
                                            </label>
                                            {values.moods.includes('tense') &&
                                                <div className="flex gap-2">
                                                    <Field
                                                        type="range"
                                                        name="moodsrate.tense"
                                                        min="1"
                                                        max="10"
                                                    />
                                                    <span>{values.moodsrate.nervous}</span>
                                                </div>}
                                        </div>

                                        <div className="flex gap-4">
                                            <label>
                                                <Field type="checkbox" name="moods" value="scared" className="mr-2" />
                                                scared
                                            </label>
                                            {values.moods.includes('scared') &&
                                                <div className="flex gap-2">
                                                    <Field
                                                        type="range"
                                                        name="moodsrate.scared"
                                                        min="1"
                                                        max="10"
                                                    />
                                                    <span>{values.moodsrate.scared}</span>
                                                </div>}
                                        </div>

                                        <div className="flex gap-4">
                                            <label>
                                                <Field type="checkbox" name="moods" value="relaxed" className="mr-2" />
                                                relaxed
                                            </label>
                                            {values.moods.includes('relaxed') &&
                                                <div className="flex gap-2">
                                                    <Field
                                                        type="range"
                                                        name="moodsrate.relaxed"
                                                        min="1"
                                                        max="10"
                                                    />
                                                    <span>{values.moodsrate.bored}</span>
                                                </div>}
                                        </div>

                                        <div className="flex gap-4">
                                            <label>
                                                <Field type="checkbox" name="moods" value="nostalgic" className="mr-2" />
                                                nostalgic
                                            </label>
                                            {values.moods.includes('nostalgic') &&
                                                <div className="flex gap-2">
                                                    <Field
                                                        type="range"
                                                        name="moodsrate.nostalgic"
                                                        min="1"
                                                        max="10"
                                                    />
                                                    <span>{values.moodsrate.nostalgic}</span>
                                                </div>}
                                        </div>

                                        <div className="flex gap-4">
                                            <label>
                                                <Field type="checkbox" name="moods" value="sad" className="mr-2" />
                                                sad
                                            </label>
                                            {values.moods.includes('sad') &&
                                                <div className="flex gap-2">
                                                    <Field
                                                        type="range"
                                                        name="moodsrate.sad"
                                                        min="1"
                                                        max="10"
                                                    />
                                                    <span>{values.moodsrate.sad}</span>
                                                </div>}
                                        </div>
                                    </div>
                                </>
                            }

                            {["reading", "read"].includes(values.status) && <div className="flex justify-between items-center max-w-[320px] max-[400px]:flex-col max-[400px]:items-start mb-2">
                                <label htmlFor="startDate">Start date
                                </label>
                                <DatePicker
                                    id="startDate"
                                    name="startDate"
                                    selected={values.startDate}
                                    onChange={(date) => setFieldValue('startDate', date)}
                                    className="px-3 py-1 rounded-md border" />
                            </div>}

                            {values.status === "read" && < div className="flex justify-between items-center max-w-[320px] max-[400px]:flex-col max-[400px]:items-start mb-2">
                                <label htmlFor="endDate">Finish date
                                </label>
                                <DatePicker
                                    id="endDate"
                                    name="endDate"
                                    selected={values.endDate}
                                    onChange={(date) => setFieldValue('endDate', date)}
                                    className="px-3 py-1 rounded-md border" />
                            </div>}

                            {values.status === "reading" && <div>
                                <p id="mood-group" className="font-semibold">Mood</p>
                                <div role="group" aria-labelledby="mood-group" className="flex flex-col mb-3">
                                    <label className="mr-1 ">
                                        <Field type="radio" name="mood" value="happy" checked="checked" className="mr-2" />
                                        happy
                                    </label>
                                    <label className="mr-1 ">
                                        <Field type="radio" name="mood" value="sad" className="mr-2" />
                                        sad
                                    </label>
                                    <label className="mr-1 ">
                                        <Field type="radio" name="mood" value="scared" className="mr-2" />
                                        scared
                                    </label>
                                    <label className="mr-1 ">
                                        <Field type="radio" name="mood" value="intrigued" className="mr-2" />
                                        intrigued
                                    </label>
                                    <label className="mr-1 ">
                                        <Field type="radio" name="mood" value="relaxed" className="mr-2" />
                                        realxed
                                    </label>
                                    <label className="mr-1 ">
                                        <Field type="radio" name="mood" value="tense" className="mr-2" />
                                        tense
                                    </label>
                                    <label className="mr-1 ">
                                        <Field type="radio" name="mood" value="in_love" className="mr-2" />
                                        in love
                                    </label>
                                    <label className="mr-1 ">
                                        <Field type="radio" name="mood" value="nostalgic" className="mr-2" />
                                        nostalgic
                                    </label>
                                </div>
                            </div>}

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