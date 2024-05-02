import { BookContextProvider } from "../context/BookContext";
import { useOutlet } from "react-router-dom";

const BookContextLayout = () => {
    const outlet = useOutlet();

    return (
        <BookContextProvider>
            {outlet}
        </BookContextProvider>
    )
}
export default BookContextLayout