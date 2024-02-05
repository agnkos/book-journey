import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"

const Books = () => {
  const { user } = useAuth()
  const [books, setBooks] = useState()

  useEffect(() => {
    const getBooks = async () => {
      console.log('token', user.token)
      try {
        const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book/all_books', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        setBooks(data)
        console.log(books)
      } catch (error) {
        console.log(error)
      }
    }
    getBooks()
  }, [])

  return (
    <div>
      Books


    </div>
  )
}
export default Books