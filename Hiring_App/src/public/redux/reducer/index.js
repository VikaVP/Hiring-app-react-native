import { combineReducers } from 'redux'

// import all reducer
import engineers from './engineers'
// import detailEngineers from './detailEngineers'
// import signup from './signup'
// import login from './login'
// import detailCompanies from './detailCompanies'
// import companies from './companies'

const rootReducer = combineReducers({
    engineers,
    // detailEngineers,
    // signup,
    // login,
    // companies,
    // detailCompanies
})

export default rootReducer