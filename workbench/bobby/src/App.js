import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import { Form, Button, Input } from "reactstrap"

class App extends Component {
  buttonClick = () => {
    console.log(this.nameInput)
    this.nameInput.focus()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Form>
            <Input
              type="text"
              innerRef={input => {
                this.nameInput = input
              }}
            />
          </Form>

          <Button onClick={this.buttonClick} />
        </header>
      </div>
    )
  }
}

export default App
