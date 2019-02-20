import React, { Component } from "react"
import { connect } from "react-redux"
import { showModal } from "../actions/modalActions"
import { MODAL_PATIENT } from "./ModalTypes"

import BillingSection from "./BillingSection"

class AppMain extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  showPatientSearch = () => {
    this.props.showModal(MODAL_PATIENT)
  }

  render() {
    return (
      <main>
        <div>
          <BillingSection />
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  showModal: modelType => dispatch(showModal(modelType))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMain)
