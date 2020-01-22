import { combineReducers } from 'redux'

// import all reducer
import engineers from './engineers'
import signup from './signup'
import login from './login'
import companies from './companies'

const rootReducer = combineReducers({
    engineers,
    signup,
    login,
    companies
})

export default rootReducer