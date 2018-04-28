import React, { Component, Fragment } from 'react'
import { Button, Col, Row, Icon, Card } from 'antd'
import UserProfileHeader from '../layouts/UserProfileHeader'
import { Description, DescriptionList, StepCard } from '../components/presentational'

export default class User extends Component {
  state = {}

  render() {
    // const { userId, username, level, joinedSince, status, itemOwned } = this.props
    const { userId, username, level, joinedSince, status, itemOwned } = {
      userId: '123444411123123',
      username: 'kamwoh',
      level: '1234',
      joinedSince: '2017-07-17',
      status: 'Gold',
      itemOwned: '1234'
    }

    const textSecondaryStyle = {
      color: 'rgba(0,0,0,0.45)'
    }

    const headerStyle = {
      color: 'rgba(0,0,0,0.85)',
      fontSize: '20px'
    }

    const extraContent = (
      <Row>
        <Col xs={ 24 } sm={ 12 }>
          <div style={ textSecondaryStyle }>Status</div>
          <div style={ headerStyle }>{ status }</div>
        </Col>
        <Col xs={ 24 } sm={ 12 }>
          <div style={ textSecondaryStyle }>Item Owned</div>
          <div style={ headerStyle }>{ itemOwned }</div>
        </Col>
      </Row>
    )

    const titleStyle = {
      fontSize: '14px',
      color: 'rgba(0,0,0,0.45)'
    }

    const description = (
      <DescriptionList gutter={ 24 }>
        <Description title="Username" titleStyle={ titleStyle } span={ 12 }>{ username }</Description>
        <Description title="Level" titleStyle={ titleStyle } span={ 12 }>{ level }</Description>
        <Description title="Joined since" titleStyle={ titleStyle } span={ 12 }>{ joinedSince }</Description>
      </DescriptionList>
    )

    const action = undefined

    const descStyle = {
      color: 'rgba(0,0,0,0.45)',
      fontSize: '14px',
      position: 'relative',
      left: '38px'
    }

    const contents = [
      {
        title: 'level1',
        desc: (
          <div style={ descStyle }>
            description
            <Fragment>
              <Icon type="dingding-o" style={ { marginLeft: 8 } }/>
            </Fragment>
            <div style={ { marginTop: '8px', marginBottom: '4px' } }>2016-12-12 12:32
            </div>
          </div>
        )
      },
      {
        title: 'level2',
        desc: (
          <div style={ descStyle }>
            description
            <Fragment>
              <Icon type="dingding-o" style={ { marginLeft: 8 } }/>
            </Fragment>
            <div style={ { marginTop: '8px', marginBottom: '4px' } }>2016-12-12 12:32
            </div>
          </div>
        )
      },
      {
        title: 'level3'
      },
      {
        title: 'level4'
      }
    ]

    return (
      <div style={ { padding: 20 } }>
        <Card bordered={ false }
              title={ `User ID: ${userId}` }>
          <UserProfileHeader
            logoSize={ '140px' }
            logoImageSource={ "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" }
            action={ action }
            description={ description }
            extraContent={ extraContent }
          />
        </Card>
        <StepCard title="Levels"
                  currentStep={ 1 }
                  currentPopoverContentTitle="Title"
                  currentPopoverContentStatus="Status"
                  currentPopoverContentValue="240 exp"
                  contents={ contents }
                  style={ { marginTop: 24, marginBottom: 24} }
                  bordered={ false }/>
        <Card title="User profile">
          <DescriptionList gutter={ 24 }>
            <Description title="Username" titleStyle={ titleStyle } span={ 8 }>{ username }</Description>
            <Description title="Level" titleStyle={ titleStyle } span={ 8 }>{ level }</Description>
            <Description title="Joined since" titleStyle={ titleStyle } span={ 8 }>{ joinedSince }</Description>
          </DescriptionList>
          <DescriptionList gutter={ 24 } style={{marginTop: '12px'}}>
            <Description title="Username" titleStyle={ titleStyle } span={ 8 }>{ username }</Description>
            <Description title="Level" titleStyle={ titleStyle } span={ 8 }>{ level }</Description>
            <Description title="Joined since" titleStyle={ titleStyle } span={ 8 }>{ joinedSince }</Description>
          </DescriptionList>
        </Card>
      </div>
    );
  }
}
