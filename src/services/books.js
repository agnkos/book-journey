import axios from 'axios';

const baseUrl = 'https://book-journey-app-54dba2b08eec.herokuapp.com/book'

axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser')).token}`
axios.defaults.headers.common['Content-Type'] = 'application/json'

const addBook = async (bookData) => {
    const response = await axios.post(`${baseUrl}`, bookData)

    if (!response.ok) {
        const errorData = await response.data.json()
        throw new Error(errorData.message)
    }
    return response.data
}

const getBooks = async () => {
    try {
        const response = await axios.get(`${baseUrl}/books`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

const getBookDetail = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

const addToFavourites = async (id) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}/favourite`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export default { addBook, getBooks, getBookDetail, deleteBook, addToFavourites }