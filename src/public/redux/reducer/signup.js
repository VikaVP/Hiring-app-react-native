const initialState = {
    register: [],
    isLoading: false,
    isError: false
}

const signup = (state = initialState, action) => {
    switch (action.type) {
        // loading
        case "FETCH_SIGNUP_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }

        // berhasil
        case "FETCH_SIGNUP_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                // engineers: action.payload.data
                register: action.payload.data.data
            }

        // gagal
        case "FETCH_SIGNUP_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state
    }
}

export default signup