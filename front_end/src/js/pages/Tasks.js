import React, { Component, Fragment } from 'react'
import { Col, Layout, Row, Button, Modal, Input } from 'antd'
import { Field, TaskCard } from '../components/presentational'
import { withTaskAction } from '../components/container'
import { getAxios } from '../helpers/tokenHelper'

import { CODE_VERIFICATION_URL } from '../config/url.js'

const { Content } = Layout

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  style: { marginBottom: 24 }
}

const fieldValue = {
  0: 'Failed',
  1: 'On Going',
  2: 'Done'
}

const fieldValueStyle = {
  0: '#e74c3c',
  1: '#3498db',
  2: '#2ecc71'
}

class Tasks extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    currentId: '',
    code: ''
  }

  handleOk = () => {
    this.setState({ confirmLoading: true }, async () => {
      try {
        const res = await getAxios(
          `${CODE_VERIFICATION_URL}?code=${this.state.code}`
        )
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    })

    this.setState({ visible: false, code: '' })
  }

  handleCancel = () => {
    this.setState({
      code: '',
      confirmLoading: false,
      currentId: '',
      visible: false
    })
  }

  handleClick = id => {
    this.setState({
      visible: true,
      currentId: id,
      confirmLoading: false,
      code: ''
    })
  }
  render() {
    const { visible, confirmLoading } = this.state
    const { tasks } = this.props
    return (
      <Layout>
        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          <Fragment>
            <Row gutter={24}>
              {tasks.map((card, cardIndex) => (
                <Col key={`col${cardIndex}`} {...topColResponsiveProps}>
                  <TaskCard
                    bordered={false}
                    missionLocation={card.missionLocation}
                    missionPoint={card.missionPoint}
                    missionName={
                      card.missionName.length > 17
                        ? `${card.missionName.substring(0, 16)}...`
                        : card.missionName
                    }
                    footer={
                      <div>
                        <Field
                          label="Status:"
                          labelStyle={{ marginRight: 10 }}
                          value={fieldValue[card.missionStatus]}
                          valueStyle={{
                            color: fieldValueStyle[card.missionStatus]
                          }}
                          style={{ display: 'inline-block' }}
                        />
                        <Button
                          style={{ float: 'right', display: 'inline-block' }}
                          size="small"
                          onClick={() => this.handleClick(card.Id)}
                        >
                          Verify
                        </Button>
                      </div>
                    }
                    key={`col${cardIndex}task${cardIndex}`}
                  >
                    <Field
                      value={card.missionDescription}
                      style={{ overflow: 'display' }}
                    />
                  </TaskCard>
                </Col>
              ))}
            </Row>
            <Modal
              title="Title"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            >
              <Input
                placeholder="Enter the verification code"
                onChange={e => this.setState({ code: e.target.value })}
              />
            </Modal>
          </Fragment>
        </Content>
      </Layout>
    )
  }
}

export default withTaskAction(Tasks)
