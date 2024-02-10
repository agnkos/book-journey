import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import PropTypes from 'prop-types';

const SearchBook = ({ searchBook }) => {

    const onSubmit = (values, { resetForm, setErrors }) => {
        if (!values.author && !values.title) {
            setErrors({ title: 'At least one of the input fields must be filled in' });
            return
        }
        const dataAuthor = (values.author).replace(/ /g, '+')
        const dataTitle = (values.title).replace(/ /g, '+')
        searchBook(dataAuthor, dataTitle)
        resetForm()
    }

    const validationSchema = Yup.object({
        title: Yup.string(),
        author: Yup.string(),
    })

    return (
        <>
            <Formik
                initialValues={{ title: '', author: '' }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form className="max-w-[500px] mb-6">
                        <div className="flex flex-col mb-3 min-[400px]:flex-row min-[400px]:items-center">
                            <label htmlFor="title" className="w-[80px] mr-3 mb-1 font-semibold">Book title
                            </label>
                            <Field
                                type="text"
                                name="title"
                                id="title"
                                className="px-3 py-1 rounded-md border grow" />
                        </div>
                        <div className="flex flex-col mb-3 min-[400px]:flex-row min-[400px]:items-center">
                            <label className="w-[80px] mr-3 mb-1 font-semibold" htmlFor="author">Author
                            </label>
                            <Field
                                type="text"
                                name="author"
                                id="author"
                                className="mb-2 px-3 py-1 rounded-md border grow" />
                            <ErrorMessage name="author" component="div" className="text-sm text-red-500" />
                        </div>
                        <ErrorMessage name="title" component="div" className="text-sm text-red-500" />
                        <button type="submit"
                            className="px-4 py-2 mt-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md ml-auto block"
                        >Search</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}
export default SearchBook

SearchBook.propTypes = {
    setResults: PropTypes.func,
    setIsLoading: PropTypes.func,
    searchBook: PropTypes.func,

}