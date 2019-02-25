import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers"
import thunk from "redux-thunk"
import validateClaimMiddleware from "./middleware/validateClaimMiddleware"
import validateBillingLinePropertyUpdateMiddleware from "./middleware/validateBillingLinePropertyUpdateMiddleware"

const initialState = {}

const middleware = [
  thunk,
  validateClaimMiddleware,
  validateBillingLinePropertyUpdateMiddleware
]

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)
// compose(
//   applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
export default store
