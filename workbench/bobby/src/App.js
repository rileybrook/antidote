import React, { Component } from "react"
import { connect } from "react-redux"

import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { Container, Row, Col, Form, Input } from "reactstrap"

import LandingPage from "./LandingPage"

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Container fluid className="bg-secondary">
            <Row className="bg-success">
              <Col className="bg-primary" md={{ size: 4, offset: 4 }}>
                <LandingPage />
              </Col>
            </Row>
            <Row>
              <Col className="bg-warning" md={12}>
                Row 2
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    )
  }
}

let mapStateToProps = function(state) {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
