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
        throw new Error(errorData.message)
    }
}


// export const getBooks = async (token) => {
//     try {
//         const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book/add', {
//             method: 'POST',
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