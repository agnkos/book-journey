import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from "../../hooks/useAuth";
import { addBook } from "../../helpers/requests";

const ReadForm = () => {
  const { user } = useAuth()
  // console.log('token', user.token)

  const initialValues = {
    title: '',
    author: '',
    rate: 0,
    review: '',
    moods: [],
    moodsrate: { inlove: 1, happy: 1, dreamy: 1, nervous: 1, scared: 1, bored: 1, nostalgic: 1, sad: 1, angry: 1 },
    startDate: null,
    finishDate: null
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values)
        const bookData = {
          title: values.title,
          author: values.author,
          status: "READ",
          review: {
            score: values.rate,
            comment: values.review
          },
          startDate: values.startDate,
          endDate: values.endDate
        }
        addBook(bookData, user.token)
      }}
    >
      {({ values, setFieldValue }) => {
        // console.log(values)
        return (
          <Form>
            <div>
              <label>Book title
                <Field
                  type="text"
                  name="title"
                  className="w-11/12 mb-2 px-3 py-1 rounded-md border" />
              </label>
            </div>
            <div>
              <label>Author
                <Field
                  type="text"
                  name="author"
                  className="w-11/12 mb-2 px-3 py-1 rounded-md border" />
              </label>
            </div>

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
                  <Field type="checkbox" name="moods" value="in love" className="mr-2" />
                  In love
                </label>
                {values.moods.includes('in love') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.inlove"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="moods" value="happy" className="mr-2" />
                  happy
                </label>
                {values.moods.includes('happy') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.happy"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="moods" value="dreamy" className="mr-2" />
                  dreamy
                </label>
                {values.moods.includes('dreamy') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.dreamy"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="moods" value="nervous" className="mr-2" />
                  nervous
                </label>
                {values.moods.includes('nervous') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.nervous"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="moods" value="scared" className="mr-2" />
                  scared
                </label>
                {values.moods.includes('scared') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.scared"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="moods" value="bored" className="mr-2" />
                  bored
                </label>
                {values.moods.includes('bored') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.bored"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="moods" value="nostalgic" className="mr-2" />
                  nostalgic
                </label>
                {values.moods.includes('nostalgic') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.nostalgic"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="moods" value="sad" className="mr-2" />
                  sad
                </label>
                {values.moods.includes('sad') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.sad"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="moods" value="angry" className="mr-2" />
                  angry
                </label>
                {values.moods.includes('angry') &&
                  <div className="flex gap-2 mb-1">
                    <Field
                      type="range"
                      name="moodsrate.angry"
                      min="1"
                      max="5"
                    />
                    <span>{values.moodsrate.inlove}</span>
                  </div>}
              </div>

            </div>

            <div className="flex justify-between items-center max-w-[320px] max-[400px]:flex-col max-[400px]:items-start mb-2">
              <label>Start date
              </label>
              <DatePicker
                id="startDate"
                name="startDate"
                selected={values.startDate}
                onChange={(date) => setFieldValue('startDate', date)}
                className="px-3 py-1 rounded-md border" />
            </div>
            <div className="flex justify-between items-center max-w-[320px] max-[400px]:flex-col max-[400px]:items-start mb-2">
              <label>Finish date
              </label>
              <DatePicker
                id="finishDate"
                name="finishDate"
                selected={values.finishDate}
                onChange={(date) => setFieldValue('finishDate', date)}
                className="px-3 py-1 rounded-md border" />
            </div>

            <button type="submit"
              className="px-4 py-2 mt-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md"
            >Add book</button>
          </Form>
        )
      }}
    </Formik>
  )
}
export default ReadForm