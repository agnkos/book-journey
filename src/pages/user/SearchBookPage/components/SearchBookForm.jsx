import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import PropTypes from 'prop-types';
import HintsContainer from "./HintsContainer";
import { useRef, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SearchBook = ({ searchBook, setCurrentPage }) => {
    const titleInputRef = useRef(null)
    const authorInputRef = useRef(null)
    const [showHintsTitle, setShowHintsTitle] = useState(false)
    const [showHintsAuthor, setShowHintsAuthor] = useState(false)

    useEffect(() => {
        const closeOnClickOutside = () => {
            document.activeElement === titleInputRef.current ? setShowHintsTitle(true) : setShowHintsTitle(false)
            document.activeElement === authorInputRef.current ? setShowHintsAuthor(true) : setShowHintsAuthor(false)
        }
        document.addEventListener('click', closeOnClickOutside);
        return () => {
            document.removeEventListener('click', closeOnClickOutside);
        };
    }, [])

    const onSubmit = (values, { resetForm, setErrors }) => {
        console.log('sent values', values)
        if (!values.author && !values.title) {
            setErrors({ title: 'At least one of the input fields must be filled in' });
            return
        }
        const dataAuthor = (values.author).replace(/ /g, '+')
        const dataTitle = (values.title).replace(/ /g, '+')
        searchBook(dataAuthor, dataTitle)
        resetForm()
        // setCurrentPage(0)
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
                {({ values, setFieldValue }) => {
                    return (<Form className="max-w-[500px] mb-6">
                        <div className="flex flex-col mb-3 min-[400px]:flex-row min-[400px]:items-center">
                            <label htmlFor="title" className="w-[80px] mr-3 mb-1 font-semibold">Book title
                            </label>
                            <div className="flex items-center relative px-3 py-1 grow border border-light-objects rounded-md focus-within:outline focus-within:outline-2">
                                <Field
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full grow focus:outline-none"
                                    innerRef={titleInputRef}
                                />
                                {values.title.length > 0 &&
                                    <XMarkIcon className="w-6 h-6 stroke-text-faded hover:stroke-link-active transition duration-150 cursor-pointer"
                                        onClick={() => setFieldValue('title', '')}
                                    />
                                }
                                {values.title.length > 2 &&
                                    <HintsContainer
                                        searchBook={searchBook}
                                        showHintsTitle={showHintsTitle}
                                        setShowHintsTitle={setShowHintsTitle}
                                        titleInputRef={titleInputRef}
                                        setCurrentPage={setCurrentPage}
                                    />
                                }
                            </div>
                        </div>

                        <div className="flex flex-col mb-3 min-[400px]:flex-row min-[400px]:items-center">
                            <label className="w-[80px] mr-3 mb-1 font-semibold" htmlFor="author">Author
                            </label>
                            <div className="flex items-center relative px-3 py-1 grow border border-light-objects rounded-md focus-within:outline focus-within:outline-2">
                                <Field
                                    type="text"
                                    name="author"
                                    id="author"
                                    className="w-full grow focus:outline-none"
                                    innerRef={authorInputRef}
                                />
                                {values.author.length > 1 &&
                                    <XMarkIcon className="w-6 h-6 stroke-text-faded hover:stroke-link-active transition duration-150 cursor-pointer"
                                        onClick={() => setFieldValue('author', '')}
                                    />
                                }
                                {values.author.length > 2 &&
                                    <HintsContainer
                                        searchBook={searchBook}
                                        showHintsAuthor={showHintsAuthor}
                                        setShowHintsAuthor={setShowHintsAuthor}
                                        authorInputRef={authorInputRef}
                                        setCurrentPage={setCurrentPage}
                                    />
                                }
                            </div>
                            <ErrorMessage name="author" component="div" className="text-sm text-red-500" />
                        </div>
                        <ErrorMessage name="title" component="div" className="text-sm text-red-500" />
                        <button type="submit"
                            className="px-4 py-2 mt-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md ml-auto block"
                        >Search</button>
                    </Form>)
                }}
            </Formik>
        </>
    )
}
export default SearchBook

SearchBook.propTypes = {
    searchBook: PropTypes.func,
    setCurrentPage: PropTypes.func,
}