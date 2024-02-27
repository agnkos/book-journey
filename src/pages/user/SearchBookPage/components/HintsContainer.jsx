import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const HintsContainer = ({ searchBook, showHintsTitle, setShowHintsTitle, showHintsAuthor, setShowHintsAuthor, titleInputRef, authorInputRef }) => {
    const [queryResultsTitle, setQueryResultsTitle] = useState()
    const [queryResultsAuthor, setQueryResultsAuthor] = useState()
    const { values, setFieldValue, resetForm } = useFormikContext()
    const [selectedItem, setSelectedItem] = useState(-1)

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
                    setQueryResultsAuthor(authorsFiltered.slice(0, 5))
                }
            }
        }
        getHintsTitle()
        getHintsAuthor()
    }, [values, showHintsTitle, showHintsAuthor])


    useEffect(() => {
        const handleKeyDownTitle = (e) => {
            if (document.activeElement === titleInputRef.current && e.key === "ArrowUp" && selectedItem > -1) {
                setSelectedItem(prev => prev - 1)
                console.log('selected title', selectedItem)
            } else if (document.activeElement === titleInputRef.current && e.key === "ArrowDown" && selectedItem < queryResultsTitle.length - 1) {
                setSelectedItem(prev => prev + 1)
            } else if (document.activeElement === titleInputRef.current && e.key === "Enter" && selectedItem >= 0) {
                searchBook(queryResultsTitle[selectedItem])
            }
        }
        const handleKeyDownAuthor = (e) => {
            if (document.activeElement === authorInputRef.current && e.key === "ArrowUp" && selectedItem > -1) {
                setSelectedItem(prev => prev - 1)
                console.log('selected title', selectedItem)
            } else if (document.activeElement === authorInputRef.current && e.key === "ArrowDown" && selectedItem < queryResultsAuthor.length - 1) {
                setSelectedItem(prev => prev + 1)
            } else if (document.activeElement === authorInputRef.current && e.key === "Enter" && selectedItem >= 0) {
                searchBook(queryResultsAuthor[selectedItem])
            }
        }

        if (showHintsTitle) {
            document.addEventListener('keydown', handleKeyDownTitle)
        }

        if (showHintsAuthor) {
            document.addEventListener('keydown', handleKeyDownAuthor)
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDownTitle);
            document.removeEventListener('keydown', handleKeyDownAuthor);
        };
    }, [showHintsTitle, queryResultsTitle, searchBook, selectedItem, titleInputRef, showHintsAuthor, authorInputRef, queryResultsAuthor])


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
                        className={`flex w-full px-2 py-1 hover:bg-light-objects cursor-pointer ${index === selectedItem ? 'bg-light-objects' : ''}`}
                        onClick={() => handleTitleHintClick(item.title, item.author)}>
                        <p className='truncate'>{item.title}</p><p className='truncate'>, {item.author}</p>
                    </div>
                ))}
            </div>
        )

    if (queryResultsAuthor && showHintsAuthor)
        return (
            <div className="absolute top-9 left-0 w-full text-xs bg-white border z-10">
                {queryResultsAuthor.map((item, index) => (
                    <p key={item}
                        className={`flex w-full px-2 py-1 hover:bg-light-objects cursor-pointer ${index === selectedItem ? 'bg-light-objects' : ''}`}
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
    titleInputRef: PropTypes.object,
    authorInputRef: PropTypes.object,
}