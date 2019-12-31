const initialState = {
    engineers: [],
    isLoading: false,
    isError: false,
    page: []
}
const engineers = (state = initialState, action) => {
    switch (action.type) {
        // loading
        case "FETCH_ENGINEERS_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }

        // berhasil
        case "FETCH_ENGINEERS_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                // engineers: action.payload.data
                engineers: action.payload.data.data,
                page: action.payload.data.pageDetail
            }

        // gagal
        case "FETCH_ENGINEERS_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state
    }
}

export default engineers