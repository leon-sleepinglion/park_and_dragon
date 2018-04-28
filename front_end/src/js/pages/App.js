import React, { Component } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../reducers'

const store = createStore(
  combineReducers({
    ...reducers
  })
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <p>a</p>} />
            {/* <Route exact path="/login" /> */}
            {/* <Route exact path="/register" /> */}
            {/* <Route exact path="/tasks" /> */}
            {/* <Route exact path="/inventory" /> */}
            {/* <Route exact path="/shop" /> */}
            {/* <Route exact path="/clan" /> */}
            {/* <Route exact path="/feedback" /> */}
            {/* <Route exact path="/user" /> */}
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
