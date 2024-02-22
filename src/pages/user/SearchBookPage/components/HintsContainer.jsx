import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const HintsContainer = ({ searchBook, showHintsTitle, setShowHintsTitle, showHintsAuthor, setShowHintsAuthor }) => {
    const [queryResultsTitle, setQueryResultsTitle] = useState()
    const [queryResultsAuthor, setQueryResultsAuthor] = useState()
    const { values, setFieldValue, resetForm } = useFormikContext()

    useEffect(() => {
        const getHintsTitle = async () => {
            if (values.title?.length > 2 && showHintsTitle) {
                const title = (values.title).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${title}"+intitle:"${title}"&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                // console.log('title data', data.items)
                const titles = data.items.map((t) => ({ title: t.volumeInfo.title, author: t.volumeInfo.authors, id: t.id }))
                // console.log('only titles', titles)
                const filteredTitles = titles.filter((value, index, self) => index === self.findIndex((t) => t.title === value.title && t?.author?.[0] === value?.author?.[0]))
                setQueryResultsTitle(filteredTitles)
                // console.log('filtered titles', filteredTitles)

            }
        }
        const getHintsAuthor = async () => {
            if (values.author?.length > 2 && showHintsAuthor) {
                console.log('values author', values.author)
                const author = (values.author).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${author}"+inauthor:"${author}"&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                const authors = data.items.map(a => a.volumeInfo.authors[0].trim())
                const authorsFiltered = [...new Set(authors)]
                setQueryResultsAuthor(authorsFiltered)
                // console.log('author', data.items)
                // console.log('filtered authors', authorsFiltered)
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
        resetForm()
    }
    const handleAuthorHintClick = async (author) => {
        setFieldValue('author', author)
        await searchBook(author)
        setShowHintsAuthor(false)
        resetForm()
    }

    // useEffect(() => {
    //     console.log('queryResultsTitle', queryResultsTitle)
    //     console.log('queryResultsAuthor', queryResultsAuthor)
    // }, [queryResultsAuthor, queryResultsTitle])

    if (queryResultsTitle && showHintsTitle)
        return (
            <div className="absolute top-8 left-0 w-full px-2 py-1 text-xs bg-white border z-10">
                {queryResultsTitle.slice(0, 5).map(item => (
                    <div key={item.id}
                        className="flex w-full hover:bg-light-objects cursor-pointer"
                        onClick={() => handleTitleHintClick(item.title, item.author)}>
                        <p className='truncate'>{item.title}</p><p className='truncate'>, {item.author}</p>
                    </div>
                ))}
            </div>
        )

    if (queryResultsAuthor && showHintsAuthor)
        return (
            <div className="absolute top-8 left-0 w-full px-2 py-1 text-xs bg-white border z-10">
                {queryResultsAuthor.slice(0, 5).map(item => (
                    <p key={item}
                        className="hover:bg-light-objects cursor-pointer"
                        onClick={() => handleAuthorHintClick(item)}
                    >{item}</p>
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