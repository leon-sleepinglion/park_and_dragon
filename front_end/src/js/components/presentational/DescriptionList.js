import React from 'react'
import { Row } from 'antd'

const DescriptionList = ({
                           gutter,
                           children,
                           ...rest
                         }) => {
  return (
    <Row gutter={ gutter }
         { ...rest }>
      { children }
    </Row>
  )
}

export default DescriptionList