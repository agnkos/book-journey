import axios from 'axios';

const baseUrl = 'https://book-journey-app-54dba2b08eec.herokuapp.com/auth'

axios.defaults.headers.common['Content-Type'] = 'application/json'

const login = async (loginData) => {
    const response = await axios.post(`${baseUrl}/login`, loginData)
    return response.data
}
const logout = async () => {
    const response = await axios.post(`${baseUrl}/logout`)
    return response.data
}

const signup = async (signupData) => {
    console.log(signupData)
    const response = await axios.post(`${baseUrl}/users`, signupData)
    return response.data
}

export default { login, logout, signup }