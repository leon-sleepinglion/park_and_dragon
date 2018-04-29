import React, { Component } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../reducers'

import { Main, Blank } from '../layouts'
import { mainConfig, blankConfig, loginConfig, registerConfig } from '../config'

import Home from './Home'
import Inventory from './Inventory'
import Shop from './Shop'
import Tasks from './Tasks'
import User from './User'
import Canvas from "./Canvas"
import Login from './Login'
import Register from './Register'

const store = createStore(reducers)

export default class App extends Component {
  state = {
    login: true
  }

  loginSuccess = () => this.setState({ login: true })

  render() {
    const { login } = this.state
    return (
      <Provider store={ store }>
        <BrowserRouter>
          {login ? (
            <Main config={mainConfig}>
              <Switch>
                <Route exact path="/home" render={() => <Home />} />
                <Route exact path="/canvas" render={ () => <Canvas/> }/>
                <Route exact path="/tasks" render={() => <Tasks />} />
                <Route exact path="/inventory" render={() => <Inventory />} />
                <Route exact path="/shop" render={() => <Shop />} />
                <Route exact path="/user" render={() => <User />} />
                <Redirect to="/home" />
              </Switch>
            </Main>
          ) : (
            <Blank config={blankConfig}>
              <Route
                exact
                path="/login"
                render={() => (
                  <Login
                    loginSuccess={this.loginSuccess}
                    config={loginConfig}
                  />
                )}
              />
              <Route
                exact
                path="/register"
                render={() => <Register config={registerConfig} />}
              />
              <Redirect to="/login" />
            </Blank>
          )}
        </BrowserRouter>
      </Provider>
    )
  }
}
