import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { hideModal } from "../../actionCreators"

import "./PatientSearch.css"

class PatientSearch extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal isOpen={this.props.modalIsOpen} className="patient-search">
        <ModalHeader toggle={this.props.hideModal}>Patient Search</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
    modalIsOpen: state.modalIsOpen
    // modalType: state.modal.modalType
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSearch)
