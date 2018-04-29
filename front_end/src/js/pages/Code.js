import React from 'react'
import axios from 'axios'
import { Card, Button, Col, Row } from 'antd'

class Code extends React.Component {
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
      <Row
        align="middle"
        justify="center"
        type="flex"
        style={{ minHeight: 'inherit' }}
      >
        <Col span={6}>
          <Card bordered={false} style={{ background: 'rgba(255,255,255,0.9' }}>
            <Row>
              <Col>
                <h2 style={{ textAlign: 'center' }}>
                  {this.state.code
                    ? `Code generated: ${this.state.code}`
                    : 'Press the button to get a new code!'}
                </h2>
              </Col>
            </Row>
            <Row>
              <Button
                type="primary"
                className="login-form-button"
                style={{ width: '100%' }}
                onClick={this.onClick}
              >
                Generate
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Code
