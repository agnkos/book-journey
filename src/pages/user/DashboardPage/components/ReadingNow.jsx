import { useContext } from "react"
import BookContext from "../../../../context/BookContext"
import BookElement from "./BookElement"


const ReadingNow = () => {
    const { books } = useContext(BookContext)

    const booksReading = books?.READING.map(book =>
        <BookElement key={book.id} book={book} />
    )

    console.log(books?.READING)

    return (
        <div>
            <h2 className="text-xl font-semibold">Reading Now</h2>
            <div>
                {booksReading}
            </div>
        </div>
    )
}
export default ReadingNow