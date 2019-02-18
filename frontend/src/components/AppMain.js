import React, { Component } from "react"
import { connect } from "react-redux"
import { showModal } from "../actions/modalActions"
import { PATIENT_SEARCH_MODAL } from "./modals/modalTypes"

import "./AppMain.css"

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
    this.props.showModal(PATIENT_SEARCH_MODAL)
  }

  render() {
    return (
      <main>
        <div>
          <Container className="container">
            <Row>
              <Col>.col</Col>
            </Row>
            <Row>
              <Col>.col</Col>
              <Col>.col</Col>
              <Col>.col</Col>
              <Col>.col</Col>
            </Row>
            <Row>
              <Col xs="3">.col-3</Col>
              <Col xs="6">
                <Button onClick={this.showPatientSearch} color="danger">
                  Button in the Middle2
                </Button>
              </Col>
              <Col xs="3">.col-3</Col>
            </Row>
            <Row>
              <Col xs="6">.col-6</Col>
              <Col xs="6">.col-6</Col>
            </Row>
          </Container>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
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
