import axios from 'axios';

const baseUrl = 'https://book-journey-app-54dba2b08eec.herokuapp.com/book'

axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser')).token}`
axios.defaults.headers.common['Content-Type'] = 'application/json'

// export const addBook = async (bookData, token) => {
//     console.log('data sent', bookData)
//     console.log('stringify', JSON.stringify(bookData))
//     const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(bookData),
//     })

//     if (!response.ok) {
//         const errorData = await response.json()
//         console.log(errorData)
//         throw new Error(errorData.message)
//     }
// }

const addBook = async (bookData) => {
    console.log(bookData)
    const response = await axios.post(`${baseUrl}`, bookData)

    if (!response.ok) {
        const errorData = await response.data.json()
        console.log(errorData)
        throw new Error(errorData.message)
    }
    return response.data
}

// export const addBook = async () => {
//     const reponse = await axios.
// }

// export const getBooks = async (token) => {
//     try {
//         const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book/books', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         const data = await response.json()
//         console.log('data from book context', data)
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

const getBooks = async () => {
    try {
        const response = await axios.get(`${baseUrl}/books`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

// export const getBookDetail = async (id, token) => {
//     try {
//         const response = await fetch(`https://book-journey-app-54dba2b08eec.herokuapp.com/book/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         const data = await response.json()
//         console.log(data)
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

const getBookDetail = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

// export const deleteBook = async (id, token) => {
//     try {
//         const response = await fetch(`https://book-journey-app-54dba2b08eec.herokuapp.com/book/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         const data = await response.json()
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }

const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

// export const addToFavourites = async (id, token) => {
//     try {
//         const response = await fetch(`https://book-journey-app-54dba2b08eec.herokuapp.com/book/${id}/favourite`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         const data = await response.json()
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }

const addToFavourites = async (id) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}/favourite`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export default { addBook, getBooks, getBookDetail, deleteBook, addToFavourites }