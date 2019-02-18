import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap"

import { hideModal } from "../../actions/modalActions"

import "./PatientSearch.css"

class PatientSearch extends Component {
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

  sexDropDownToggle = () => {
    this.setState(prevState => ({
      sexDropDownOpened: !prevState.sexDropDownOpened
    }))
  }

  sexDropDownOnClick = e => {
    this.setState({ sexDropDownValue: e.currentTarget.textContent })
  }

  getPatientRows = () => {
    //   <tr>
    //   <th scope="row">1</th>
    //   <td>Mark</td>
    //   <td>Otto</td>
    //   <td>@mdo</td>
    // </tr>
    // <tr>
    //   <th scope="row">2</th>
    //   <td>Jacob</td>
    //   <td>Thornton</td>
    //   <td>@fat</td>
    // </tr>
    // <tr>
    //   <th scope="row">3</th>
    //   <td>Larry</td>
    //   <td>the Bird</td>
    //   <td>@twitter</td>
    // </tr>
  }

  render() {
    return (
      <Modal
        size="xl"
        isOpen={this.props.modalIsOpen}
        className="patient-search"
      >
        <ModalHeader toggle={this.props.hideModal}>Patient Search</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Form inline>
                  <Input className="mr-1" placeholder="medicare" />
                  <Input className="mr-1" placeholder="last name" />
                  <Input className="mr-1" placeholder="first name" />
                  <Input className="mr-1" placeholder="date of birth" />
                  <Dropdown
                    isOpen={this.state.sexDropDownOpened}
                    toggle={this.sexDropDownToggle}
                  >
                    <DropdownToggle
                      onClick={() => this.setState({ sexDropDownValue: "Sex" })}
                      color="white"
                      caret
                    >
                      {this.state.sexDropDownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.sexDropDownOnClick}>
                        Female
                      </DropdownItem>
                      <DropdownItem onClick={this.sexDropDownOnClick}>
                        Male
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
                      <th>Sex</th>
                    </tr>
                  </thead>
                  <tbody>{this.getPatientRows}</tbody>
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
    modalIsOpen: state.modalReducer.modalIsOpen
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSearch)
