import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const HintsContainer = ({ searchBook, showHintsTitle, setShowHintsTitle, showHintsAuthor, setShowHintsAuthor, titleInputRef }) => {
    const [queryResultsTitle, setQueryResultsTitle] = useState()
    const [queryResultsAuthor, setQueryResultsAuthor] = useState()
    const { values, setFieldValue, resetForm } = useFormikContext()
    const [selectedTitleItem, setSelectedTitleItem] = useState(-1)
    const [selectedAuthorItem, setSelectedAuthorItem] = useState(-1)


    useEffect(() => {
        const getHintsTitle = async () => {
            if (values.title?.length > 2 && showHintsTitle) {
                const title = (values.title).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${title}"+intitle:"${title}"&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                if (data.totalItems > 0) {
                    const titles = data.items.map((t) => ({ title: t.volumeInfo.title, author: t.volumeInfo.authors, id: t.id }))
                    const filteredTitles = titles.filter((value, index, self) => index === self.findIndex((t) => t.title === value.title && t?.author?.[0] === value?.author?.[0]))
                    setQueryResultsTitle(filteredTitles.slice(0, 5))
                }
            }
        }
        const getHintsAuthor = async () => {
            if (values.author?.length > 2 && showHintsAuthor) {
                console.log('values author', values.author)
                const author = (values.author).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${author}+inauthor:${author}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                console.log('atuhor data', data)
                if (data.totalItems > 0) {
                    const authors = data?.items.map(a => a.volumeInfo?.authors?.[0].trim())
                    const authorsFiltered = [...new Set(authors)]
                    setQueryResultsAuthor(authorsFiltered)
                }
            }
        }
        getHintsTitle()
        getHintsAuthor()
    }, [values, showHintsTitle, showHintsAuthor])


    useEffect(() => {
        const handleKeyDown = (e) => {
            e.stopPropagation()
            // console.log(e.key)
            if (document.activeElement === titleInputRef.current && e.key === "ArrowUp" && selectedTitleItem > -1) {
                setSelectedTitleItem(prev => prev - 1)
                console.log('selected title', selectedTitleItem)
            } else if (document.activeElement === titleInputRef.current && e.key === "ArrowDown" && selectedTitleItem < queryResultsTitle.length - 1) {
                setSelectedTitleItem(prev => prev + 1)
            } else if (document.activeElement === titleInputRef.current && e.key === "Enter" && selectedTitleItem >= 0) {
                searchBook(queryResultsTitle[selectedTitleItem])
            }
        }
        if (showHintsTitle) {

            document.addEventListener('keydown', handleKeyDown)
            console.log('selet title', selectedTitleItem)
            console.log('ref', titleInputRef)
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showHintsTitle, queryResultsTitle, searchBook, selectedTitleItem, titleInputRef])


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

    useEffect(() => {
        console.log('query title', queryResultsTitle)
    }, [queryResultsTitle])

    if (queryResultsTitle && showHintsTitle)
        return (
            <div className="absolute top-9 left-0 w-full text-xs bg-white border z-10">
                {queryResultsTitle.map((item, index) => (
                    <div key={item.id}
                        className={`flex w-full px-2 py-1 hover:bg-light-objects cursor-pointer ${index === selectedTitleItem ? 'bg-light-objects' : ''}`}
                        onClick={() => handleTitleHintClick(item.title, item.author)}>
                        <p className='truncate'>{item.title}</p><p className='truncate'>, {item.author}</p>
                    </div>
                ))}
            </div>
        )

    if (queryResultsAuthor && showHintsAuthor)
        return (
            <div className="absolute top-9 left-0 w-full px-2 py-1 text-xs bg-white border z-10">
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
    setShowHintsAuthor: PropTypes.func,
    titleInputRef: PropTypes.ReactNode
}