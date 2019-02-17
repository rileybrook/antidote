export const loadModal = modalType => {
  return {
    type: "SHOW_MODAL",
    modalType
  }
}

export const hideModal = () => {
  return {
    type: "HIDE_MODAL"
  }
}
