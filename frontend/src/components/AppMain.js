import React, { Component } from "react"
import { connect } from "react-redux"
import { showModal } from "../actions/modalActions"
import { showBillingSection } from "../actions/mainActions"
import { loadBillingCodes } from "../actions/billingActions"
import { MODAL_PATIENT } from "./ModalTypes"

import BillingSection from "./BillingSection"
import LandingPage from "./LandingPage"

import { Container, Row, Col } from "reactstrap"

class AppMain extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  showPatientSearch = () => {
    this.props.showModal(MODAL_PATIENT)
  }

  stringClickedInvoice = () => {
    return this.props.billingSectionShown ? " clickedInvoice" : ""
  }

  componentDidMount = () => {
    this.props.loadBillingCodes()

    //TODO(bobby) comment out very next line to not show billing section at startup
    // this.props.showBillingSection()
  }
  render() {
    return (
      <main className="main color-grey">
        <Container>
          <Row>
            <Col md={{ size: 12 }}>
              <LandingPage />
            </Col>
          </Row>
          <Row>
            <Col
              md={{ size: 12 }}
              className={"billingSection" + this.stringClickedInvoice()}
            >
              <BillingSection />
            </Col>
          </Row>
        </Container>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    billingSectionShown: state.mainReducer.billingSectionShown,
    billingCodes: state.billingReducer.billingCodes
  }
}

const mapDispatchToProps = dispatch => ({
  showModal: modelType => dispatch(showModal(modelType)),
  loadBillingCodes: () => dispatch(loadBillingCodes()),
  showBillingSection: () => dispatch(showBillingSection())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMain)
