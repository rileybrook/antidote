import React, { Component } from "react"
import { connect } from "react-redux"
import { showModal } from "../actions/modalActions"
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
  componentDidMount = () => {}
  render() {
    return (
      <main className="main">
        <Container>
          <Row>
            <Col md={{ size: 12 }}>
              <LandingPage />
            </Col>
          </Row>
          <Row>
            <Col
              md={12}
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
  return { billingSectionShown: state.mainReducer.billingSectionShown }
}

const mapDispatchToProps = dispatch => ({
  showModal: modelType => dispatch(showModal(modelType))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMain)
