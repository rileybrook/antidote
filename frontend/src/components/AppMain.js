import React, { Component } from "react"
import { connect } from "react-redux"
import { showModal } from "../actions/modalActions"
import { MODAL_PATIENT } from "./ModalTypes"

import { Button, Container, Row, Col } from "reactstrap"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap"

class AppMain extends Component {
  constructor(props) {
    super(props)
  }

  showPatientSearch = () => {
    this.props.showModal(MODAL_PATIENT)
  }

  render() {
    return (
      <main>
        <div>

        <Button  onClick={this.showPatientSearch}>Advanced Search</Button>

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
