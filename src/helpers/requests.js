// export const addBook = async (bookData, token, { setErrors = () => { } } = {}, { resetForm = () => { } } = {}) => {
//     console.log('data sent', bookData)
//     console.log('stringify', JSON.stringify(bookData))
//     try {
//         const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(bookData),
//         })
//         console.log(response)
//         if (!response.ok) {
//             const errorData = await response.json()
//             console.log(errorData)
//             throw new Error(errorData.message)
//         }
//         resetForm()
//     } catch (error) {
//         console.log('error from addBook', error.message)
//         setErrors({ author: error.message })
//     }
// }

export const addBook = async (bookData, token) => {
    console.log('data sent', bookData)
    console.log('stringify', JSON.stringify(bookData))
    const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookData),
    })

    if (!response.ok) {
        const errorData = await response.json()
        console.log(errorData)
        throw new Error(errorData.message)
    }
}

export const getBooks = async (setBooks, token) => {
    try {
        const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        console.log('data from book context', data)
        setBooks(data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteBook = async (id, token) => {
    try {
        const response = await fetch(`https://book-journey-app-54dba2b08eec.herokuapp.com/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
