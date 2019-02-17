import { createStore } from "redux"

const initialState = {
  modalType: null,
  modalIsOpen: false
}

let reducer = function(state, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case "SHOW_MODAL":
      newState.modalType = action.modalType
      newState.modalIsOpen = true
      break

    case "HIDE_MODAL":
      newState.modalType = null
      newState.modalIsOpen = false
      break

    default:
      return state
  }

  return newState
}

export default createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
