export const addBook = async (bookData, token, actions) => {
    console.log('data sent', bookData)
    console.log('stringify', JSON.stringify(bookData))
    try {
        const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData),
        })
        console.log(response)
        if (!response.ok) {
            const errorData = await response.json()
            console.log(errorData)
            throw new Error(errorData.message)
        }

    } catch (error) {
        actions.setStatus({ response: error.message })
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