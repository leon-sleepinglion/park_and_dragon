import React from 'react'
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Layout,
  Row
} from 'antd'
import axios from 'axios'

const FormItem = Form.Item
const { Header } = Layout

export default class Register extends React.Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    emailAddress: '',
    accessLevel: 1,
    termsAndConditionsIsChecked: false,
    buttonLoading: false
  }

  registerButtonOnClick() {
    this.setState({ buttonLoading: true })
    console.log('register on click')

    let url = 'http://localhost:5000/user'
    axios
      .post(url, {
        name: this.state.username,
        email: this.state.emailAddress,
        password: this.state.password,
        user_level: this.state.accessLevel
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  validateFormData() {
    console.log('validating')
    return this.state.termsAndConditionsIsChecked
  }

  inputOnChange(item, e) {
    this.setState({ [item.stateName]: e.target.value })
  }

  render() {
    const { config } = this.props
    return (
      <Row
        align="middle"
        justify="center"
        type="flex"
        style={ { minHeight: 'inherit' } }
      >
        <Col span={ 6 }>
          <Row>
            <Col>
              <Header style={ { background: 'none', textAlign: 'center' } }>
                <h2>
                  <Avatar src={ this.props.logo }/>
                  { config.title }
                </h2>
              </Header>
            </Col>
          </Row>
          <Row>
            <Form className="login-form">
              { config &&
              config.informations.map((item, index) => (
                <FormItem label={ item.label } key={ index }>
                  <Input
                    prefix={
                      <Icon type={ item.icon } style={ { color: item.color } }/>
                    }
                    placeholder={ item.label }
                    value={ this.state[item.stateName] }
                    onChange={ e => this.inputOnChange(item, e) }
                    { ...item.props }
                  />
                </FormItem>
              )) }
              <FormItem>
                <Row>
                  <Col>
                    <Checkbox
                      checked={ this.state.termsAndConditionsIsChecked }
                      onChange={ e =>
                        this.setState({
                          termsAndConditionsIsChecked: e.target.checked
                        })
                      }
                    >
                      I have read the terms and conditions
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      type="primary"
                      className="login-form-button"
                      style={ { width: '100%' } }
                      disabled={ !this.validateFormData() }
                      onClick={ () => this.registerButtonOnClick() }
                    >
                      Register
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Row>
        </Col>
      </Row>
    )
  }
}
