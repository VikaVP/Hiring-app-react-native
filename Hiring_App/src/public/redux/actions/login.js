import axios from 'axios'

export const fetchLogin = (data) => ({
    type: "FETCH_LOGIN",
    payload: axios.post(`http://54.81.61.49:8080/api/v1/login`, data)
})