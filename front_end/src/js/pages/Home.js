import React from 'react'
import { Row, Col, Card } from 'antd'
import withHomeAction from '../components/container/withHomeAction'

class Home extends React.Component {
  render() {
    const { user, tasks, shop } = this.props
    return (
      <div>
        <Row gutter="24">
          <Col span="8">
            <Card>
              <img
                src={user.pic}
                alt="profile pic"
                style={{ width: '100%', marginLeft: -30 }}
              />
              <h1
                style={{
                  textAlign: 'center',
                  margin: 0,
                  fontFamily: 'Berkshire Swash, cursive'
                }}
              >
                {user.username}
              </h1>
            </Card>
          </Col>
          <Col span="8">
            <Card title="Task" bordered={false}>
              {tasks.length ? (
                tasks.map(({ missionName, id }) => (
                  <p key={id}>{missionName}</p>
                ))
              ) : (
                <p>No task.</p>
              )}
            </Card>
          </Col>
          <Col span="8">
            <Card title="Shop" bordered={false}>
              {shop.items.length ? (
                shop.items.map(({ title, id }) => <p key={id}>{title}</p>)
              ) : (
                <p>No item on sale.</p>
              )}
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 24 }} gutter={24}>
          <Col>
            <Card
              style={{
                minHeight: 300,
                width: '100%',
                background:
                  'url("http://static.hdw.eweb4.com/media/wallpapers_dl/1/140/1390779-cool-white-background.jpg") center bottom / cover'
              }}
              bordered={false}
            >
              <h1>Major Update Soon</h1>
              <p>
                Our app are scheduled to be updated on 30th of April, 2018.
                Users might experienced server downtime due to maintainence and
                major software update starting at around 8am. We are pushing out
                several new exciting features and we are really looking forward
                to providing you with better experience!
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withHomeAction(Home)
