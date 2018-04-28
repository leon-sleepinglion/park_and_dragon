import React, { Fragment } from 'react'
import ItemCard from "../components/presentational/ItemCard"
import {
  Layout,
  Row,
  Col
} from 'antd'

const { Content } = Layout

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 }
}

export default class Inventory extends React.Component {
  render() {
    // const { items } = this.props
    const item = {
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Europe Street beat',
      description: 'www.instagram.com'
    }

    const items = [
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item
    ]

    return (
      <Layout>
        <Content style={ { margin: '24px 24px 0', height: '100%' } }>
          <Fragment>
            <Row gutter={ 24 }>
              { items.map((item, itemIndex) => (
                <Col key={ `col${itemIndex}` } { ...topColResponsiveProps }>
                  <ItemCard coverImageSource={ item.src }
                            metaTitle={ item.title }
                            metaDescription={ item.description }
                            style={ { width: 240 } }/>
                </Col>
              )) }
            </Row>
          </Fragment>
        </Content>
      </Layout>
    )
  }
}
