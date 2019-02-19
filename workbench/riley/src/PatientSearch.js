import React, { Component } from "react"
import { Input, Row, Col, Fade, Button, Container } from "reactstrap"

let sampleData = [
  {
    medicare: "COTL13081315",
    lastName: "COTE",
    FirstName: "LOGAN",
    birthDate: "2013-08-13",
    gender: "male"
  },
  {
    medicare: "NITA13581415",
    lastName: "NITHERAMAVEERA",
    FirstName: "AKHSHAYA",
    birthDate: "2013-08-14",
    gender: "female"
  }
]

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

  //Initiate (animation: zoom-up) and (animation: button-fade)
  handleClick() {
    this.setState({ clickedClass: true })
  }
  render() {
    return (
      <div>
        <Container>
    
        <Row>
          <Input 
             className={`patient-search field${
              this.state.clickedClass ? " clicked" : ""
            }`}
            placeholder="Search for Patient.."
            onChange={this.handleChange}
            value={this.state.query}
          />
        </Row>

        <Row>
        <Button
          className={`create-invoice button${
            this.state.clickedClass ? " clicked" : ""
          }`
        }
          onClick={this.handleClick}
        >Create Invoice
        </Button>
        </Row>

        </Container>
      </div>
    )
  }
}

export default PatientSearch
