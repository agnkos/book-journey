import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const HintsContainer = ({ searchBook }) => {

    // const [query, setQuery] = useState()
    const [queryResults, setQueryResults] = useState()
    const [showHints, setShowHints] = useState(true)
    const { values, setFieldValue, resetForm } = useFormikContext()

    useEffect(() => {
        // console.log(query)
        // setQuery(values)
        console.log(values)
        const getHints = async () => {
            if (values.title?.length > 2 && showHints) {

                const title = (values.title).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${title}"+intitle:"${title}"&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                // const titles = data.items.map(item => item.volumeInfo.title)
                setQueryResults(data.items)
                // setShowHints(true)
                console.log(data.items)
            }
        }
        getHints()
    }, [values, showHints])

    const handleHintClick = (title, author) => {
        setFieldValue('title', title)
        setFieldValue('author', author)
        searchBook(author, title)
        setShowHints(false)
        resetForm()
    }

    useEffect(() => {
        console.log('queryResults', queryResults)
    })
    if (queryResults && showHints)
        return (
            <div className="absolute top-8 left-0 w-full px-2 py-1 text-xs bg-white border">
                {queryResults.slice(0, 5).map(item => (
                    <p key={item.id}
                        className="hover:bg-light-objects cursor-pointer"
                        onClick={() => handleHintClick(item.volumeInfo.title, item.volumeInfo.authors[0])}
                    >{item.volumeInfo.title}, {item.volumeInfo.authors}</p>
                ))}
            </div>
        )
}
export default HintsContainer

HintsContainer.propTypes = {
    searchBook: PropTypes.func
}