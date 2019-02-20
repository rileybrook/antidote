import React, { Component } from "react"
import { Input, Row, Form, Button, Container } from "reactstrap"

class PatientSearch extends Component {
  constructor() {
    super()
    this.state = {
      query: "",

      clickedClass: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event) {
    this.setState({ query: event.target.value })
  }

  //Initiate (animation: button-fade) and(animation: zoom-up)
  handleClick() {
    this.setState({ clickedClass: true })
  }
  render() {
    return (
      <div>
        <Container>
          <Form>
            <Row> {/* Input Field: Patient Search */}
              <Input
                className={`patient-search active ${
                  this.state.clickedClass ? " clicked" : ""
                }`}
                placeholder="Search for Patient.."
                onChange={this.handleChange}
                value={this.state.query}
              />
            </Row>

            {/* --> Add Patient Dropdown functionality here <-- */}

            <Row> {/* Button: Create Invoice */}
              <Button
                className={`create-invoice${
                  this.state.clickedClass ? " clicked" : ""
                }`}
                onClick={this.handleClick}
              >
                Create Invoice
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    )
  }
}

export default PatientSearch
