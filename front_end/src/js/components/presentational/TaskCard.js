import React from 'react'
import { Card } from 'antd'

const valueStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  whiteSpace: 'nowrap',
  color: 'fade(#000, 85%)',
  marginTop: '4px',
  marginBottom: 0,
  fontSize: '30px',
  lineHeight: '38px',
  height: '38px',
  fontFamily: 'Berkshire Swash, cursive'
}

const renderValue = value => {
  let totalDom
  switch (typeof value) {
    case 'undefined':
      totalDom = null
      break
    case 'function':
      totalDom = <div style={valueStyle}>{value()}</div>
      break
    default:
      totalDom = <div style={valueStyle}>{value}</div>
  }
  return totalDom
}

const chartCardStyle = {
  position: 'relative'
}

const chartCardTopStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  marginBottom: '12px'
}

const metaStyle = {
  color: 'fade(#000, 45%)',
  fontSize: '14px',
  lineHeight: '22px',
  height: '22px'
}

const pointStyle = {
  position: 'absolute',
  top: 0,
  right: 0
}

const locationStyle = {}

const contentFixedStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%'
}

const footerStyle = {
  borderTop: '1px solid rgba(0,0,0,0.1)',
  paddingTop: '9px',
  marginTop: '8px',
  '& > *': {
    position: 'relative'
  }
}

const itemStyle = {
  width: '100%',
  display: 'inline-block',
  fontSize: '14px',
  lineHeight: '22px'
}

const itemValueStyle = {}

const TaskCard = ({
  contentHeight,
  missionLocation,
  missionPoint,
  missionName,
  footer,
  children,
  ...rest
}) => {
  const content = (
    <div style={chartCardStyle}>
      <div style={chartCardTopStyle}>
        <div style={{ float: 'left' }}>
          <div style={metaStyle}>
            <span style={locationStyle}>{missionLocation}</span>
            <span style={pointStyle}>{missionPoint}</span>
          </div>
          {renderValue(missionName)}
        </div>
      </div>
      {children && (
        <div
          style={{
            height: contentHeight || 'auto',
            marginBottom: '12px',
            position: 'relative',
            width: '100%'
          }}
        >
          <div style={contentHeight && contentFixedStyle}>{children}</div>
        </div>
      )}
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  )

  return (
    <Card bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
      <div style={itemStyle}>
        <span style={itemValueStyle}>{content}</span>
      </div>
    </Card>
  )
}

export default TaskCard
