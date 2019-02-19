import { SHOW_MODAL, HIDE_MODAL } from "../actions/actionTypes"

const initialState = {
  modalType: null,
  modalIsOpen: false
}

export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case SHOW_MODAL:
      newState.modalType = action.modalType
      newState.modalIsOpen = true
      return newState

    case HIDE_MODAL:
      newState.modalType = null
      newState.modalIsOpen = false
      return newState

    default:
      return state
  }
}
