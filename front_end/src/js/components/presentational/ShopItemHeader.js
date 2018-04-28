import React from 'react'
import { Card, Row, Col } from 'antd'

const headerInfoStyle = {
  position: 'relative',
  textAlign: 'center'
}

const headerInfoSpanStyle = {
  color: 'rgba(0,0,0,0.45)',
  display: 'inline-block',
  fontSize: '14px',
  lineHeight: '22px',
  marginBottom: '4px'
}

const headerInfoPStyle = {
  color: 'rgba(0,0,0,0.85)',
  fontSize: '24px',
  lineHeight: '32px',
  margin: '0',
  fontFamily: 'Berkshire Swash, cursive'
}

const headerInfoEmStyle = {
  backgroundColor: 'rgba(0,0,0,0.2)',
  position: 'absolute',
  height: '56px',
  width: '1px',
  top: 0,
  right: 0
}

const ShopItemHeader = ({
  leftValue,
  leftTitle,
  midValue,
  midTitle,
  rightValue,
  rightTitle
}) => {
  const Info = ({ title, value, bordered }) => (
    <div style={headerInfoStyle}>
      <span style={headerInfoSpanStyle}>{title}</span>
      <p style={headerInfoPStyle}>{value}</p>
      {bordered && <em style={headerInfoEmStyle} />}
    </div>
  )

  return (
    <Card bordered={false}>
      <Row>
        <Col sm={8} xs={24}>
          <Info title={leftTitle} value={leftValue} bordered />
        </Col>
        <Col sm={8} xs={24}>
          <Info title={midTitle} value={midValue} bordered />
        </Col>
        <Col sm={8} xs={24}>
          <Info title={rightTitle} value={rightValue} />
        </Col>
      </Row>
    </Card>
  )
}

export default ShopItemHeader
