import React from 'react'
import {
  Card,
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
    twizoWait: false,
    code: '',
    messageId: ''
  }

  componentDidMount() {
    this.props.verifyJWT(() => this.props.loginSuccess(this.props.email))
  }

  validateFormData() {
    return this.state.emailAddress !== '' && this.state.password !== ''
  }

  inputOnChange(item, e) {
    this.setState({ [item.stateName]: e.target.value })
  }

  loginOnClick = async () => {
    const { emailAddress, password } = this.state
    const messageId = await this.props.loginAttempt(emailAddress, password)
    this.setState({ messageId, twizoWait: true })
  }

  loginFail = () => {
    this.setState({ code: '' }, () => alert('Invalid token. Try again.'))
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
          <Card
            bordered={false}
            style={{ background: 'rgba(255,255,255,0.9)' }}
          >
            <Row>
              <Col>
                <Header style={{ background: 'none', textAlign: 'center' }}>
                  <h2>{config.title}</h2>
                </Header>
              </Col>
            </Row>
            <Row>
              {this.state.twizoWait ? (
                <Form className="login-form">
                  <FormItem label="Verification Token">
                    <Input
                      placeholder="Enter your verification token here"
                      value={this.state.code}
                      onChange={e => this.setState({ code: e.target.value })}
                    />
                  </FormItem>
                  <Button
                    onClick={() =>
                      this.props.twizoVerification(
                        this.state.messageId,
                        this.state.emailAddress,
                        this.state.code,
                        () => this.props.loginSuccess(this.state.emailAddress),
                        this.loginFail
                      )
                    }
                    type="primary"
                    className="login-form-button"
                    style={{ width: '100%' }}
                  >
                    OK
                  </Button>
                </Form>
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
          </Card>
        </Col>
      </Row>
    )
  }
}

export default withLoginHelper(Login)
