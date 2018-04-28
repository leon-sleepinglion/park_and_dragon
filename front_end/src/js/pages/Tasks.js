import React, { Component, Fragment } from 'react'
import { Col, Layout, Row, } from 'antd'
import { Field, TaskCard } from '../components'

const { Content } = Layout

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

export default class Tasks extends Component {
  state = {}

  render() {
    const linkCard = {
      content: {
        missionId: '1234',
        missionName: 'Mission A',
        missionDescription: 'This is to buy something from store A',
        missionLocation: 'Location A',
        missionPoint: '100',
        missionStatus: 0 // 0 = not yet, 1 = doing, 2 = done
      }
    }
    const cols = [
      linkCard,
      linkCard,
      linkCard,
      linkCard
    ]
    const rows = [
      cols,
      cols,
      cols,
      cols
    ]

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


    return (
      <Layout>
        <Content style={ { margin: '24px 24px 0', height: '100%' } }>
          <Fragment>
            { rows.map((col, index) => {
              return (
                <Row key={ `row${index}` } gutter={ 24 }>
                  { col.map((card, cardIndex) => {
                    return (
                      <Col key={ `row${index}col${cardIndex}` } { ...topColResponsiveProps }>
                        <TaskCard
                          bordered={ false }
                          missionLocation={ card.content.missionLocation }
                          missionPoint={ card.content.missionPoint }
                          missionName={ card.content.missionName }
                          footer={ <Field label="Status:"
                                          labelStyle={ { marginRight: 10 } }
                                          value={ fieldValue[card.content.missionStatus] }
                                          valueStyle={ { color: fieldValueStyle[card.content.missionStatus] } }/> }
                          key={ `row${index}col${cardIndex}task${cardIndex}` }
                        >
                          <Field value={ card.content.missionDescription } style={ { overflow: 'display' } }/>
                        </TaskCard>
                      </Col>
                    )
                  }) }
                </Row>
              )
            }) }
          </Fragment>
        </Content>
      </Layout>
    );
  }
}
