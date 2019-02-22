import React from "react"
import { connect } from "react-redux"
import ModalPatient from "./PatientSearchModal"

const MODAL_COMPONENTS = {
  MODAL_PATIENT: ModalPatient
}

const ModalContainer = props => {
  if (!props.modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[props.modalType]

  return <SpecificModal />
}

const mapStateToProps = state => {
  return {
    modalType: state.modalReducer.modalType
  }
}

export default connect(mapStateToProps)(ModalContainer)
