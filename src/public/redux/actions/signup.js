
import axios from 'axios'

export const fetchSignup = (role, data) => ({
    type: "FETCH_SIGNUP",
    payload: axios.post(`http://54.81.61.49:8080/api/v1/${role}`, data)
})