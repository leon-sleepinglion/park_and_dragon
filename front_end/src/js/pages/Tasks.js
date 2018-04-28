import React, { Component, Fragment } from 'react'
import { Col, Layout, Row } from 'antd'
import { Field, TaskCard } from '../components/presentational'
import { withTaskAction } from '../components/container'

const { Content } = Layout

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
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
  render() {
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
                    missionName={card.missionName}
                    footer={
                      <Field
                        label="Status:"
                        labelStyle={{ marginRight: 10 }}
                        value={fieldValue[card.missionStatus]}
                        valueStyle={{
                          color: fieldValueStyle[card.missionStatus]
                        }}
                      />
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
          </Fragment>
        </Content>
      </Layout>
    )
  }
}

export default withTaskAction(Tasks)
