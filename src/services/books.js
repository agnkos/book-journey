import axios from 'axios';

const baseUrl = 'https://book-journey-app-54dba2b08eec.herokuapp.com/book'

// const setAuthToken = (token) => {
//     axios.defaults.headers.common['Authorization'] = '';
//     delete axios.defaults.headers.common['Authorization'];

//     if (token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}` || `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser'))?.token}`
//         // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
// }

// axios.interceptors.request.use(function (config) {
//     const storage = localStorage.getItem('loggedBookJourneyUser')
//     console.log('parsed', JSON.parse(localStorage.getItem('loggedBookJourneyUser'))?.token)
//     console.log('localStorage', localStorage.getItem('loggedBookJourneyUser'))
//     if (storage) {
//         const token = JSON.parse(storage).token
//         console.log('tokennn', token)
//         config.headers.Authorization = `Bearer ${token}`

//     }
//     config.headers['Content-Type'] = 'application/json'
//     return config
// });


// client.interceptors.request.use(
//     config => {
//         config.headers['Authorization'] = `Bearer ${localStorage.getItem('loggedBookJourneyUser').token}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser'))?.token}`

axios.defaults.headers.common['Content-Type'] = 'application/json'

const addBook = async (bookData) => {
    console.log('bookData', bookData)
    console.log('default token', axios.defaults.headers.common['Authorization'])
    const response = await axios.post(`${baseUrl}`, bookData)
    console.log(response)
    // if (!response.ok) {
    //     const errorData = await response.data
    //     console.log('errrodata', errorData)
    //     throw new Error(errorData.message)
    // }
    return response.data
}

const getBooks = async (token) => {
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    }
    // console.log('default token', axios.defaults.headers.common['Authorization'])
    try {
        const response = await axios.get(`${baseUrl}/books`, config)
        console.log('books request', response.data)
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

const editBookDetail = async (id, bookData) => {
    console.log('book id', id)
    console.log('bookData', bookData)
    try {
        const response = await axios.put(`${baseUrl}/${id}/`, bookData)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export default { addBook, getBooks, getBookDetail, deleteBook, addToFavourites, editBookDetail }