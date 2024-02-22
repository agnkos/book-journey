import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import PropTypes from 'prop-types';
import HintsContainer from "./HintsContainer";
import { useRef, useEffect, useState } from "react";

const SearchBook = ({ searchBook }) => {

    const titleInputRef = useRef(null)
    const authorInputRef = useRef(null)
    const [showHintsTitle, setShowHintsTitle] = useState(true)
    const [showHintsAuthor, setShowHintsAuthor] = useState(true)

    useEffect(() => {
        const closeOnClickOutside = () => {
            document.activeElement === titleInputRef.current ? setShowHintsTitle(true) : setShowHintsTitle(false)
            document.activeElement === authorInputRef.current ? setShowHintsAuthor(true) : setShowHintsAuthor(false)
            // if (document.activeElement === titleInputRef.current) {
            //     console.log('input current')
            //     setShowHintsTitle(true)
            // } else if ((document.activeElement === authorInputRef.current)) {
            //     console.log('author input focus')
            //     setShowHintsAuthor(true)
            // }
            // else {
            //     setShowHintsTitle(false)
            //     // setShowHintsAuthor(false)
            //     console.log('input not focused')
            // }
        }
        document.addEventListener('click', closeOnClickOutside);
        return () => {
            document.removeEventListener('click', closeOnClickOutside);
        };
    }, [])

    // const [query, setQuery] = useState()
    // const [queryResults, setQueryResults] = useState()
    // const [showHints, setShowHints] = useState(false)

    // useEffect(() => {
    //     console.log(query)
    //     setQuery(values)
    //     console.log(values)
    //     const getHints = async () => {
    //         if (query?.title?.length > 2) {
    //             const title = (query.title).replace(/ /g, '+')
    //             const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle:${title}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
    //             const data = await response.json()
    //             // const titles = data.items.map(item => item.volumeInfo.title)
    //             setQueryResults(data.items)
    //             setShowHints(true)
    //             console.log(data)
    //         }
    //     }
    //     getHints()
    // }, [values])

    // useEffect(() => {
    //     if (queryResults) {
    //         queryResults.map(item => console.log(item.volumeInfo.title, item.volumeInfo.authors))
    //         // console.log(queryResults)
    //     }
    // }, [queryResults])

    // useEffect(() => {
    //     console.log(query)
    // }, [query])


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
    }

    const validationSchema = Yup.object({
        title: Yup.string(),
        author: Yup.string(),
    })

    // const handleHintClick = (title, author, setFieldValue) => {
    //     setFieldValue('title', title)
    //     setFieldValue('author', author)
    //     setShowHints(false)
    // }

    // const handleInputChange = (title) => {
    //     // const value = e.target.value;
    //     setQuery(title); // Update React state
    // };

    return (
        <>
            <Formik
                initialValues={{ title: '', author: '' }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values }) => {
                    // setQuery(values)
                    return (<Form className="max-w-[500px] mb-6">
                        <div className="flex flex-col mb-3 min-[400px]:flex-row min-[400px]:items-center">
                            <label htmlFor="title" className="w-[80px] mr-3 mb-1 font-semibold">Book title
                            </label>
                            <div className="relative grow">

                                <Field
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full px-3 py-1 rounded-md border grow"
                                    innerRef={titleInputRef}

                                // onChange={() => { handleInputChange(values.title); handleChange }}
                                />
                                {/* {(query?.title?.length > 2 && queryResults && showHints) && */}
                                {values.title.length > 2 &&
                                    <HintsContainer searchBook={searchBook}
                                        showHintsTitle={showHintsTitle}
                                        setShowHintsTitle={setShowHintsTitle}
                                    />
                                }
                            </div>
                        </div>
                        {/* <CustomInput
                            label="Book title"
                            name="title"
                            placeholder="Enter book title"
                            hints={queryResults?.slice(0, 5).map((item) => `${item.volumeInfo.title}, ${item.volumeInfo.authors}`)}
                            query={query}
                        /> */}
                        <div className="flex flex-col mb-3 min-[400px]:flex-row min-[400px]:items-center">
                            <label className="w-[80px] mr-3 mb-1 font-semibold" htmlFor="author">Author
                            </label>
                            <div className="relative grow">

                                <Field
                                    type="text"
                                    name="author"
                                    id="author"
                                    className="w-full mb-2 px-3 py-1 rounded-md border grow"
                                    innerRef={authorInputRef}
                                />
                                {values.author.length > 2 &&
                                    <HintsContainer searchBook={searchBook}
                                        showHintsAuthor={showHintsAuthor}
                                        setShowHintsAuthor={setShowHintsAuthor}
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
    setResults: PropTypes.func,
    setIsLoading: PropTypes.func,
    searchBook: PropTypes.func,

}