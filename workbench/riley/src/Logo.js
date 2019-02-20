import React, { Component } from "react"
import { ReactComponent as antidoteImage } from "./images/antidote.svg"
import { Input, Row, Form, Button, Container } from "reactstrap"

class Logo extends Component {
  constructor() {
    super()
    this.state = {
      clickedClass: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  //Initiate (animation: fade)
  handleClick() {
    this.setState({ clickedClass: true })
  }
  render() {
    return (
      <main>
        <Container className="landing-page">
          <Form>
            <Row>
              <Antidote />
            </Row>

            <Row>
              <Button
                className={`get-started${
                  this.state.clickedClass ? " clicked" : ""
                }`}
                onClick={this.handleClick}
              >
                Get Started
              </Button>
            </Row>
          </Form>
        </Container>
      </main>
    )
  }
}

export default Logo
