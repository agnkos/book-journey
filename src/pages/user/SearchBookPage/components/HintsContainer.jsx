import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const HintsContainer = ({ searchBook, showHintsTitle, setShowHintsTitle, showHintsAuthor, setShowHintsAuthor }) => {

    // const [query, setQuery] = useState()
    const [queryResultsTitle, setQueryResultsTitle] = useState()
    const [queryResultsAuthor, setQueryResultsAuthor] = useState()
    // const [showHints, setShowHints] = useState(true)
    const { values, setFieldValue, resetForm } = useFormikContext()

    useEffect(() => {
        // console.log(query)
        // setQuery(values)
        console.log(values)
        const getHintsTitle = async () => {
            if (values.title?.length > 2 && showHintsTitle) {

                const title = (values.title).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${title}"+intitle:"${title}"&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                // const titles = data.items.map(item => item.volumeInfo.title)
                setQueryResultsTitle(data.items)
                // setShowHints(true)
                console.log(data.items)
            }
        }
        const getHintsAuthor = async () => {
            if (values.author?.length > 2 && showHintsAuthor) {
                console.log('values author', values.author)
                const author = (values.author).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${author}"+inauthor:"${author}"&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                // const titles = data.items.map(item => item.volumeInfo.title)
                setQueryResultsAuthor(data.items)
                // setShowHints(true)
                console.log('author', data.items)
            }
        }
        getHintsTitle()
        getHintsAuthor()
    }, [values, showHintsTitle, showHintsAuthor])

    const handleTitleHintClick = async (title, author) => {
        setFieldValue('title', title)
        setFieldValue('author', author)
        await searchBook(author, title)
        setShowHintsTitle(false)
        // setShowHintsAuthor(false)
        resetForm()
    }
    const handleAuthorHintClick = async (author) => {
        // setFieldValue('title', title)
        setFieldValue('author', author)
        await searchBook(author)
        // setShowHintsTitle(false)
        setShowHintsAuthor(false)
        resetForm()
    }

    useEffect(() => {
        console.log('queryResultsTitle', queryResultsTitle)
        console.log('queryResultsAuthor', queryResultsAuthor)
        console.log('authors filtered', queryResultsAuthor.map(item => item.volumeInfo?.authors[0]))
    })
    if (queryResultsTitle && showHintsTitle)
        return (
            <div className="absolute top-8 left-0 w-full px-2 py-1 text-xs bg-white border z-10">
                {queryResultsTitle.slice(0, 5).map(item => (
                    <div key={item.id}
                        className="flex w-full hover:bg-light-objects cursor-pointer"
                        onClick={() => handleTitleHintClick(item.volumeInfo.title, item.volumeInfo.authors[0])}>
                        <p className='truncate'>{item.volumeInfo.title}</p><p className='truncate'>, {item.volumeInfo.authors}</p>
                    </div>
                ))}
            </div>
        )

    if (queryResultsAuthor && showHintsAuthor)
        return (
            <div className="absolute top-8 left-0 w-full px-2 py-1 text-xs bg-white border z-10">
                {queryResultsAuthor.slice(0, 5).map(item => (
                    <p key={item.id}
                        className="hover:bg-light-objects cursor-pointer"
                        onClick={() => handleAuthorHintClick(item.volumeInfo.authors[0])}
                    >{item.volumeInfo.authors[0]}</p>
                ))}
            </div>
        )
}
export default HintsContainer

HintsContainer.propTypes = {
    searchBook: PropTypes.func,
    showHintsTitle: PropTypes.bool,
    setShowHintsTitle: PropTypes.func,
    showHintsAuthor: PropTypes.bool,
    setShowHintsAuthor: PropTypes.func
}