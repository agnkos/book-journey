import { useContext } from "react";
import BookContext from "../context/BookContext";

const useBook = () => {
    return useContext(BookContext)
}
export default useBook