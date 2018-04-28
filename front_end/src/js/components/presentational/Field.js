import React from 'react'
import _ from 'lodash'

const fieldStyleBase = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0,
  span: {
    fontSize: '14px',
    lineHeight: '22px'
  },
  'span:lastChild': {
    marginLeft: '8px',
    color: 'fade(#000, 85%)'
  }
}

const Field = ({ label, labelStyle, value, valueStyle, ...rest }) => {
  const { style } = rest
  const fieldStyle = style === undefined ? fieldStyleBase : Object.assign(_.clone(fieldStyleBase), style)

  return (
    <div style={ fieldStyle } { ...rest }>
      {label && <span style={ labelStyle }>{ label }</span>}
      <span style={ valueStyle }>{ value }</span>
    </div>
  )
}

export default Field
