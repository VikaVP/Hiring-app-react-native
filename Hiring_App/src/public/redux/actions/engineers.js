import axios from 'axios'
// import config from '../../../config'
export const fetchEngineers = (search, page, limit, sort, sortBy) => ({
    type: "FETCH_ENGINEERS",
    payload: axios.get(`http://54.81.61.49:8080/api/v1/engineers/?s=${search}&page=${page}&limit=${limit}&sort=${sort}&sortBy=${sortBy}`)
})
export const fetchDetailEngineers = id => ({
    type: "FETCH_ENGINEERS_DETAIL",
    payload: axios.get(`http://54.81.61.49:8080/api/v1/engineers/${id}`)
})
export const fetchUpdateEngineers = (id, data, config) => ({
    type: "FETCH_ENGINEERS_UPDATE",
    payload: axios.put(`http://54.81.61.49:8080/api/v1/engineers/${id}`, data, config)
})
export const fetchDeleteEngineers = id => ({
    type: "FETCH_ENGINEERS_DELETE",
    payload: axios.delete(`http://54.81.61.49:8080/api/v1/engineers/${id}`)
})