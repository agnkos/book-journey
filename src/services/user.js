import axios from 'axios';

const baseUrl = 'https://book-journey-app-54dba2b08eec.herokuapp.com/user'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser'))?.token}`

const getUser = async (token) => {
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    }
    const response = await axios.get(`${baseUrl}/profile`, config)
    return response.data
}

const changeUsername = async (data) => {
    const response = await axios.put(`${baseUrl}/name`, data)
    return response.data
}

export default { getUser, changeUsername }