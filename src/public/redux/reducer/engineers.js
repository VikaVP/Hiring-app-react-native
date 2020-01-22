const initialState = {
    engineers: [],
    detailEngineers: [],
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


        case "FETCH_ENGINEERS_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                // engineers: action.payload.data
                engineers: action.payload.data.data,
                page: action.payload.data.pageDetail
            }

        case "FETCH_ENGINEERS_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
            case "FETCH_ENGINEERS_DETAIL_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }
        case "FETCH_ENGINEERS_UPDATE_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }

        case "FETCH_ENGINEERS_DETAIL_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                detailEngineers: [...action.payload.data]
            }
        case "FETCH_ENGINEERS_UPDATE_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                detailEngineers: [...state.detailEngineers, action.payload.data]
            }

        case "FETCH_ENGINEERS_DETAIL_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case "FETCH_ENGINEERS_UPDATE_REJECTED":
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