import axios from 'axios';

const baseUrl = 'https://book-journey-app-54dba2b08eec.herokuapp.com/book'

// let token = null

// const setToken = newToken => {
//     token = `Bearer ${newToken}` 
//     axios.defaults.headers.common['Authorization'] = `${token}`
// }

// if (token !== null) {
// }
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser'))?.token}`
axios.defaults.headers.common['Content-Type'] = 'application/json'

const addBook = async (bookData) => {
    console.log('bookdata', bookData)
    const response = await axios.post(`${baseUrl}`, bookData)

    if (!response.ok) {
        const errorData = await response.data.json()
        throw new Error(errorData.message)
    }
    return response.data
}

const getBooks = async (token) => {
    // console.log('token', token)
    // console.log('token', JSON.parse(localStorage.getItem('loggedBookJourneyUser')).token)
    // console.log('axios head', axios.defaults.headers.common['Authorization'])
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    }
    try {
        const response = await axios.get(`${baseUrl}/books`, config)
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