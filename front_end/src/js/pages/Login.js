import React from 'react'
import { Avatar, Button, Checkbox, Col, Form, Icon, Input, Layout, Row } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

const FormItem = Form.Item
const { Header } = Layout

export default class Login extends React.Component {
  state = {
    emailAddress: '',
    password: ''
  }

  validateFormData() {
    return this.state.emailAddress !== '' && this.state.password !== ''
  }

  inputOnChange(item, e) {
    this.setState({ [item.stateName]: e.target.value })
  }

  loginOnClick() {
    console.log('login success')

    const url = 'http://localhost:5000/login'

    axios.post(url, {
      email: this.state.emailAddress,
      password: this.state.password
    }).then((response) =>
      console.log(response)
    ).catch((error) =>
      console.log(error)
    )

    this.props.onSuccess()
  }

  render() {
    const config = this.props.config
    return (
      <Row align="middle" justify="center" type="flex" style={ { minHeight: 'inherit' } }>
        <Col span={ 6 }>
          <Row>
            <Col>
              <Header style={ { background: 'none', textAlign: 'center' } }>
                <h2><Avatar src={ this.props.logo }/>{ config.title }</h2>
              </Header>
            </Col>
          </Row>
          <Row>
            <Form className="login-form">
              { config && config.informations.map((item, index) =>
                <FormItem label={ item.label } key={ index }>
                  <Input prefix={ <Icon type={ item.icon } style={ { color: item.color } }/> }
                         placeholder={ item.label }
                         value={ this.state[item.stateName] }
                         onChange={ e => this.inputOnChange(item, e) }
                         { ...item.props }
                  />
                </FormItem>)
              }
              <FormItem>
                <Row>
                  <Col span={ 12 }>
                    <Checkbox>Remember me</Checkbox>
                  </Col>
                  <Col span={ 12 } style={ { textAlign: 'right' } }>
                    <a className="login-form-forgot" href="">Forgot password</a>
                  </Col>
                </Row>
                <Row>
                  <Button type="primary"
                          className="login-form-button"
                          style={ { width: '100%' } }
                          disabled={ !this.validateFormData() }
                          onClick={ () => this.loginOnClick() }>
                    Log in
                  </Button>
                </Row>
                <Row>
                  Or
                  <Link to={ '/register' }>
                    <span> register now!</span>
                  </Link>
                </Row>
              </FormItem>
            </Form>
          </Row>
        </Col>
      </Row>
    )
  }
}
