import axios from 'axios';

const baseUrl = 'https://book-journey-app-54dba2b08eec.herokuapp.com/user'

axios.defaults.headers.common['Content-Type'] = 'application/json'

const getUser = async () => {
    const response = await axios.get(`${baseUrl}/profile`)
    return response.data
}

const changeUsername = async (data) => {
    const response = await axios.put(`${baseUrl}/name`, data)
    return response.data
}

const changePassword = async (data) => {
    const response = await axios.put(`${baseUrl}/password`, data)
    return response.data
}

export default { getUser, changeUsername, changePassword }