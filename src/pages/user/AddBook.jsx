import { useState } from "react"
import ReadForm from "../../components/AddBook forms/ReadForm"
import SearchBook from "../../components/searchBook"

const AddBook = () => {
    const [displayedForm, setDisplayedForm] = useState('read')

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">Add book</h1>
            < SearchBook />
            <div className="flex gap-4 text-xl mb-2">
                <button
                    onClick={() => setDisplayedForm('read')}
                    className={`${displayedForm === 'read' ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
                >read</button>
                <button
                    onClick={() => setDisplayedForm('reading')}
                    className={`${displayedForm === 'reading' ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
                >reading</button>
                <button
                    onClick={() => setDisplayedForm('toread')}
                    className={`${displayedForm === 'toread' ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
                >to read</button>
            </div>
            {displayedForm === 'read' && <ReadForm />}
        </div>
    )
}
export default AddBook