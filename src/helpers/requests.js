export const addBook = async (bookData, token) => {
    console.log('data sent', bookData)
    console.log('stringify', JSON.stringify(bookData))
    try {
        const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData),
        })
        console.log('response', response)
        // if (!response.ok) {
        //     // const errorData = await response.json()
        //     // console.log(errorData)
        //     throw new Error('Could not add the book')
        // }
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
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