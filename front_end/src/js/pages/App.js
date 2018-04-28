import React, { Component } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../reducers'

import { Main } from '../layouts'
import { mainConfig } from '../config'

import Home from './Home'
import Inventory from './Inventory'
import Shop from './Shop'
import Tasks from './Tasks'
import User from './User'
import Canvas from "./Canvas";

const store = createStore(reducers)

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Main config={ mainConfig }>
            <Switch>
              <Route exact path="/home" render={ () => <Home/> }/>
              <Route exact path="/canvas" render={ () => <Canvas/> }/>
              { /* <Route exact path="/login" /> */ }
              { /* <Route exact path="/register" /> */ }
              <Route exact path="/tasks" render={ () => <Tasks/> }/>
              <Route exact path="/inventory" render={ () => <Inventory/> }/>
              <Route exact path="/shop" render={ () => <Shop/> }/>
              <Route exact path="/user" render={ () => <User/> }/>
              <Redirect to="/home"/>
            </Switch>
          </Main>
        </BrowserRouter>
      </Provider>
    )
  }
}
