import React from 'react'
import { Col } from 'antd'

const Description = ({
                       children,
                       title,
                       titleStyle,
                       ...rest
                     }) => {
  const detailStyle = {
    display: 'flex',
    fontSize: '20px',
    color: 'rgba(0,0,0,0.85)'
  }

  return (
    <Col { ...rest }>
      { title && <div style={ titleStyle }>{ title }</div> }
      { children && <div style={ detailStyle }>{ children }</div> }
    </Col>
  )
}

export default Description