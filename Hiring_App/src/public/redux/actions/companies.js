import axios from 'axios'

export const fetchCompanies = (search, page, limit, sort, sortBy) => ({
    type: "FETCH_COMPANIES",
    payload: axios.get(`http://54.81.61.49:8080/api/v1/companies/?s=${search}&page=${page}&limit=${limit}&sort=${sort}&sortBy=${sortBy}`)
})

export const fetchDetailCompanies = id => ({
    type: "FETCH_COMPANIES_DETAIL",
    payload: axios.get(`http://54.81.61.49:8080/api/v1/companies/${id}`)
})
export const fetchUpdateCompanies = (id, data, config) => ({
    type: "FETCH_COMPANIES_UPDATE",
    payload: axios.put(`http://54.81.61.49:8080/api/v1/companies/${id}`, data, config)
})
export const fetchDeleteCompanies = id => ({
    type: "FETCH_COMPANIES_DELETE",
    payload: axios.delete(`http://54.81.61.49:8080/api/v1/companies/${id}`)
})