import { Formik, Form, Field } from "formik"
import { useState } from "react"

const SearchBook = () => {

    const [results, setResults] = useState()

    const searchBook = async (author, title) => {
        console.log(import.meta.env.VITE_GOOGLE_BOOKS_API_KEY)
        console.log('endpoint', `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`)
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`)
            const data = await response.json()
            console.log(data)
            setResults(data.items)
        } catch (err) {
            console.log(err)
        }
    }

    const booksResults = (data) => data.map(result => (
        <div key={result.id}>
            <p>{result.volumeInfo.title}</p>
            <p>{result.volumeInfo.authors}</p>
        </div>
    ))

    return (
        <>
            <Formik
                initialValues={{ title: '', author: '' }}
                onSubmit={(values) => {
                    console.log(values)
                    const dataAuthor = (values.author).replace(/ /g, '+')
                    const dataTitle = (values.title).replace(/ /g, '+')
                    console.log(dataAuthor, dataTitle)
                    searchBook(dataAuthor, dataTitle)
                }}
            >
                {() => (
                    <Form className="max-w-[400px]">
                        <div className="flex flex-col mb-3 min-[400px]:flex-row min-[400px]:items-center">
                            <label htmlFor="title" className="w-[75px] mr-3 mb-1">Book title
                            </label>
                            <Field
                                type="text"
                                name="title"
                                id="title"
                                className="px-3 py-1 rounded-md border grow" />
                        </div>
                        <div className="flex flex-col mb-3 min-[400px]:flex-row min-[400px]:items-center">
                            <label className="w-[75px] mr-3 mb-1" htmlFor="author">Author
                            </label>
                            <Field
                                type="text"
                                name="author"
                                id="author"
                                className="mb-2 px-3 py-1 rounded-md border grow" />
                        </div>
                        <button type="submit"
                            className="px-4 py-2 mt-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md ml-auto block"
                        >Search</button>
                    </Form>
                )}
            </Formik>
            {results && booksResults(results)}
        </>
    )
}
export default SearchBook