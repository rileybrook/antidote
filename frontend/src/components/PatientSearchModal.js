import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap"

import { hideModal } from "../actions/modalActions"
import { getPatients } from "../actions/patientActions"

import { setPatient } from "../actions/billingActions"

class PatientSearchModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      medicare: "",
      lastName: "",
      firstName: "",
      dateOfBirth: "",
      sexDropDownOpened: false,
      sexDropDownValue: "Sex"
    }
  }

  componentDidMount() {
    this.props.getPatients()
  }

  onSexDropDownToggle = () => {
    this.setState(prevState => ({
      sexDropDownOpened: !prevState.sexDropDownOpened
    }))
  }

  onSexDropDownOnClick = e => {
    this.setState({ sexDropDownValue: e.currentTarget.textContent })
  }

  getPatientRows = () => {
    return this.props.patients.map((patient, index) => {
      // console.log(patient)
      return (
        <tr key={index} onClick={this.onRowClicked}>
          <td style={{ display: "none" }}>{patient._id}</td>
          <td>{patient.medicare}</td>
          <td>{patient.lastName}</td>
          <td>{patient.firstName}</td>
          <td>{patient.dateOfBirth}</td>
          <td>{patient.gender}</td>
        </tr>
      )
    })
  }

  filterTextChanged = e => {
    this.props.getPatients(e.currentTarget.value)
  }

  onRowClicked = e => {
    // console.log("cells", e.currentTarget.cells[1])
    this.props.setPatient(e.currentTarget.cells[1].innerText)
    this.props.hideModal()
  }

  render() {
    return (
      <Modal
        size="xl"
        isOpen={this.props.modalIsOpen}
        className="patient-search-modal"
      >
        <ModalHeader toggle={this.props.hideModal}>Patient Search</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Form inline>
                  <Input
                    className="m-1"
                    placeholder="filter"
                    onChange={this.filterTextChanged}
                  />
                </Form>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>Medicare</th>
                      <th>Last Name</th>
                      <th>First Name</th>
                      <th>Date of Birth</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>{this.getPatientRows()}</tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={this.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={this.props.hideModal}>
            Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    modalIsOpen: state.modalReducer.modalIsOpen,
    patientsLoading: state.patientReducer.patientsLoading,
    patients: state.patientReducer.patients
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  getPatients: filter => dispatch(getPatients(filter)),
  setPatient: medicare => dispatch(setPatient(medicare))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSearchModal)
