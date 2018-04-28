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
import { Link } from 'react-router-dom'
import withLoginHelper from '../components/container/withLoginHelper'

const FormItem = Form.Item
const { Header } = Layout

class Login extends React.Component {
  state = {
    emailAddress: '',
    password: '',
    twizoWait: false
  }

  componentDidMount() {
    this.props.verifyJWT(this.props.loginSucess)
  }

  validateFormData() {
    console.log(this.state)
    return this.state.emailAddress !== '' && this.state.password !== ''
  }

  inputOnChange(item, e) {
    this.setState({ [item.stateName]: e.target.value })
  }

  loginOnClick = async () => {
    const { emailAddress, password } = this.state
    const res = await this.props.loginAttempt(emailAddress, password)
    res
      ? this.setState({ twizoWait: true }, () =>
          this.props.twizoVerification(
            emailAddress,
            res.key,
            this.props.loginSucess
          )
        )
      : window.location.reload()
  }

  render() {
    const config = this.props.config
    return (
      <Row
        align="middle"
        justify="center"
        type="flex"
        style={{ minHeight: 'inherit' }}
      >
        <Col span={6}>
          <Row>
            <Col>
              <Header style={{ background: 'none', textAlign: 'center' }}>
                <h2>{config.title}</h2>
              </Header>
            </Col>
          </Row>
          <Row>
            {this.state.twizoWait ? (
              <p>
                Waiting for Twizo verification. Please check your Telegram to
                sign in.
              </p>
            ) : (
              <Form className="login-form">
                {config &&
                  config.informations.map((item, index) => (
                    <FormItem label={item.label} key={index}>
                      <Input
                        prefix={
                          <Icon
                            type={item.icon}
                            style={{ color: item.color }}
                          />
                        }
                        placeholder={item.label}
                        value={this.state[item.stateName]}
                        onChange={e => this.inputOnChange(item, e)}
                        {...item.props}
                      />
                    </FormItem>
                  ))}
                <FormItem>
                  <Row>
                    <Col span={12}>
                      <Checkbox>Remember me</Checkbox>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <a className="login-form-forgot" href="">
                        Forgot password
                      </a>
                    </Col>
                  </Row>
                  <Row>
                    <Button
                      type="primary"
                      className="login-form-button"
                      style={{ width: '100%' }}
                      disabled={!this.validateFormData()}
                      onClick={this.loginOnClick}
                    >
                      Log in
                    </Button>
                  </Row>
                  <Row>
                    Or
                    <Link to={'/register'}>
                      <span> register now!</span>
                    </Link>
                  </Row>
                </FormItem>
              </Form>
            )}
          </Row>
        </Col>
      </Row>
    )
  }
}

export default withLoginHelper(Login)
