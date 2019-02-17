import React from "react"
import { connect } from "react-redux"

import PatientSearchModal from "./components/modals/PatientSearch"

const MODAL_COMPONENTS = {
  PATIENT_SEARCH_MODAL: PatientSearchModal
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
    modalType: state.modalType
  }
}

export default connect(mapStateToProps)(ModalContainer)
