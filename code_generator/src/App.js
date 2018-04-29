import React, { Component } from 'react'
import logo from './logo.svg'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    code: ''
  }

  onClick = () => {
    axios
      .get('http://localhost:5000/generatecode')
      .then(res => this.setState({ code: res.data.code }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {this.state.code
              ? `The code is: ${this.state.code}`
              : 'Press generate to get your code!'}
          </h1>
        </header>
        <button style={{ marginTop: 24 }} onClick={this.onClick}>
          Generate
        </button>
      </div>
    )
  }
}

export default App
