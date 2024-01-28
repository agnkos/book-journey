import { Formik, Form, Field } from "formik"
import { useState } from "react"

const SearchBook = () => {

    const [results, setResults] = useState()

    const searchBook = async (author, title) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=AIzaSyB8UOgz3o73qj7C_Dsj0JW-vPzbo1jKzvo`)
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
                        <button type="submit"
                            className="px-4 py-2 mt-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md"
                        >Search</button>
                    </Form>
                )}
            </Formik>
            {results && booksResults(results)}
        </>
    )
}
export default SearchBook