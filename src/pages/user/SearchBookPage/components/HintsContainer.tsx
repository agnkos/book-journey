import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

type HintsContainerProps = {
    searchBook: (author: string, title?: string, index?: number) => void,
    showHintsTitle?: boolean,
    setShowHintsTitle?: (bool: boolean) => void,
    showHintsAuthor?: boolean,
    setShowHintsAuthor?: (bool: boolean) => void,
    titleInputRef?: React.RefObject<HTMLDivElement>,
    authorInputRef?: React.RefObject<HTMLDivElement>
}

type QueryAuthorType = {
    [index: string]: string,
    author: string,
    id: string
}
type QueryTitleType = {
    [index: string]: string,
    title: string,
    author: string,
    id: string
}

type FormValuesType = {
    author: string,
    title: string
}

type DataApiType = {
    volumeInfo: {
        title: string,
        authors: string[]
    },
    id: string
}

const HintsContainer = ({ searchBook, showHintsTitle, setShowHintsTitle, showHintsAuthor, setShowHintsAuthor, titleInputRef, authorInputRef }: HintsContainerProps) => {
    const [queryResultsTitle, setQueryResultsTitle] = useState<QueryTitleType[]>()
    const [queryResultsAuthor, setQueryResultsAuthor] = useState<QueryAuthorType[]>()
    const { values, setFieldValue, resetForm } = useFormikContext<FormValuesType>()
    const [selectedItem, setSelectedItem] = useState(-1)

    useEffect(() => {
        const getHintsTitle = async () => {
            if ((values).title?.length > 2 && showHintsTitle) {
                const title = (values.title).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${title}"+intitle:"${title}"&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                if (data.totalItems > 0) {
                    console.log('data items', data.items)
                    const titles = data.items.map((t: DataApiType) => ({ title: t.volumeInfo.title, author: t.volumeInfo.authors, id: t.id }))
                    const filteredTitles = titles.filter((value: QueryTitleType, index: number, self: QueryTitleType[]) => index === self.findIndex((t: QueryTitleType) => t.title === value.title && t?.author?.[0] === value?.author?.[0]))
                    setQueryResultsTitle(filteredTitles.slice(0, 5))
                    console.log(queryResultsTitle)
                }
            }
        }
        const getHintsAuthor = async () => {
            if (values.author?.length > 2 && showHintsAuthor) {
                console.log('values author', values.author)
                const author = (values.author).replace(/ /g, '+')
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${author}+inauthor:${author}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
                const data = await response.json()
                if (data.totalItems > 0) {
                    const authors = data?.items.map((a: DataApiType) => ({ author: a.volumeInfo?.authors?.[0].trim(), id: a.id }))
                    // const authorsFiltered = [...new Set(authors)]
                    const authorsFiltered = authors.filter((value: QueryAuthorType, index: number, self: QueryAuthorType[]) => index === self.findIndex((a) => a?.author === value?.author))
                    setQueryResultsAuthor(authorsFiltered.slice(0, 5))
                    console.log(queryResultsAuthor)
                }
            }
        }
        getHintsTitle()
        getHintsAuthor()
    }, [values, showHintsTitle, showHintsAuthor])


    useEffect(() => {
        console.log('author', queryResultsAuthor)
        console.log('title', queryResultsTitle)
    }, [queryResultsAuthor, queryResultsTitle])

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent, inputRef: (React.RefObject<HTMLDivElement> | undefined), queryResults: QueryAuthorType[] | QueryTitleType[]) => {
            if (document.activeElement === inputRef?.current && e.key === "ArrowUp" && selectedItem > -1) {
                setSelectedItem(prev => prev - 1)
            } else if (document.activeElement === inputRef?.current && e.key === "ArrowDown" && selectedItem < (queryResults?.length ?? 0) - 1) {
                setSelectedItem(prev => prev + 1)
            } else if (document.activeElement === inputRef?.current && e.key === "Enter" && selectedItem >= 0) {
                console.log('selected', queryResults[selectedItem])
                // searchBook(queryResults[selectedItem])
                queryResultsAuthor && searchBook(queryResults[selectedItem].author)
                queryResultsTitle && searchBook(queryResults[selectedItem].author, queryResults[selectedItem].title)
            }
        }
        const handleKeyDownTitle = (e: KeyboardEvent) => {
            queryResultsTitle && onKeyDown(e, titleInputRef, queryResultsTitle)
        }

        const handleKeyDownAuthor = (e: KeyboardEvent) => {
            queryResultsAuthor && onKeyDown(e, authorInputRef, queryResultsAuthor)
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


    const handleTitleHintClick = async (title: string, author: string) => {
        console.log('author and title', title, author)
        setFieldValue('title', title)
        setFieldValue('author', author)
        searchBook(author, title)
        setShowHintsTitle && setShowHintsTitle(false)
        resetForm()
    }
    const handleAuthorHintClick = async (author: string) => {
        console.log('author', author)
        setFieldValue('author', author)
        searchBook(author)
        setShowHintsAuthor && setShowHintsAuthor(false)
        resetForm()
    }

    if (queryResultsTitle && showHintsTitle)
        return (
            <div className="absolute top-9 left-0 w-full text-xs bg-white border z-10">
                {queryResultsTitle.map((item, index) => (
                    <div key={item.id}
                        className={`flex w-full px-2 py-1 hover:bg-light-objects cursor-pointer ${index === selectedItem ? 'bg-light-objects' : ''}`}
                        onClick={() => handleTitleHintClick(item.title, item.author[0])}>
                        <p className='truncate'>{item.title}</p><p className='truncate'>, {item.author}</p>
                    </div>
                ))}
            </div>
        )

    if (queryResultsAuthor && showHintsAuthor)
        return (
            <div className="absolute top-9 left-0 w-full text-xs bg-white border z-10">
                {queryResultsAuthor.map((item, index) => (
                    <p key={item.id}
                        className={`flex w-full px-2 py-1 hover:bg-light-objects cursor-pointer ${index === selectedItem ? 'bg-light-objects' : ''}`}
                        onClick={() => handleAuthorHintClick(item.author)}
                    >{item.author}</p>
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