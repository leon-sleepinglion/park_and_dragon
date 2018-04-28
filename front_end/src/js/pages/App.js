import React, { Component } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../reducers'

import { Main } from '../layouts'
import { mainConfig } from '../config'

import Clan from './Clan'
import Feedback from './Feedback'
import Home from './Home'
import Inventory from './Inventory'
import Shop from './Shop'
import Tasks from './Tasks'
import User from './User'

const store = createStore(reducers)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main config={mainConfig}>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              {/* <Route exact path="/login" /> */}
              {/* <Route exact path="/register" /> */}
              <Route exact path="/tasks" render={() => <Tasks />} />
              <Route exact path="/inventory" render={() => <Inventory />} />
              <Route exact path="/shop" render={() => <Shop />} />
              <Route exact path="/clan" render={() => <Clan />} />
              <Route exact path="/feedback" render={() => <Feedback />} />
              <Route exact path="/user" render={() => <User />} />
              <Redirect to="/" />
            </Switch>
          </Main>
        </BrowserRouter>
      </Provider>
    )
  }
}
