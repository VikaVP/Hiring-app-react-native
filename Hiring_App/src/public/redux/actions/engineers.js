import axios from 'axios'
import config from '../../../config'
export const fetchEngineers = (search, page, limit, sort, sortBy) => ({
    type: "FETCH_ENGINEERS",
    payload: axios.get(`${config.REACT_APP_API_URL2}/engineers/?s=${search}&page=${page}&limit=${limit}&sort=${sort}&sortBy=${sortBy}`)
})