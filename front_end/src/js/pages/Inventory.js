import React, { Fragment } from 'react'
import ItemCard from '../components/presentational/ItemCard'
import { Layout, Row, Col } from 'antd'
import { withInventoryAction } from '../components/container'

const { Content } = Layout

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 }
}

class Inventory extends React.Component {
  render() {
    const items = this.props.inventory

    return (
      <Layout>
        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          <Fragment>
            <Row gutter={24}>
              {items.map((item, itemIndex) => (
                <Col key={`col${itemIndex}`} {...topColResponsiveProps}>
                  <ItemCard
                    coverImageSource={item.src}
                    metaTitle={item.title}
                    metaDescription={item.description}
                    style={{ width: 240 }}
                  />
                </Col>
              ))}
            </Row>
          </Fragment>
        </Content>
      </Layout>
    )
  }
}

export default withInventoryAction(Inventory)
