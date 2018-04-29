import React, { PureComponent } from 'react'

export default class PageHeader extends PureComponent {
  render() {
    const {
      title,
      logoSize,
      logoImageSource,
      action,
      content,
      extraContent
    } = this.props

    const detailStyle = {
      display: 'flex'
    }

    const logoStyle = {
      flex: '0 1 auto',
      marginRight: '16px',
      marginBottom: '16px',
      paddingTop: '1px'
    }

    const size = logoSize === undefined ? '28px' : logoSize

    const logoImageStyle = {
      width: size,
      height: size,
      borderRadius: '4px',
      display: 'block'
    }

    const mainStyle = {
      flex: 'auto'
    }

    const rowStyle = {
      display: 'flex'
    }

    const titleStyle = {
      fontSize: '20px',
      fontWeight: '500',
      color: 'rgba(0,0,0,0.85)',
      flex: 'auto',
      marginBottom: '16px'
    }

    const actionStyle = {
      textAlign: 'right',
      marginBottom: '16px',
      flex: 'auto',
      marginLeft: '56px',
      minWidth: '266px'
    }

    const contentStyle = {
      flex: 'auto',
      marginBottom: '16px'
    }

    const extraContentStyle = {
      flex: 'auto',
      marginBottom: '16px',
      textAlign: 'right',
      marginLeft: '88px',
      minWidth: '242px'
    }

    return (
      <div style={detailStyle}>
        {logoImageSource && (
          <div style={logoStyle}>
            <img alt="" src={logoImageSource} style={logoImageStyle} />
          </div>
        )}
        <div style={mainStyle}>
          <div style={rowStyle}>
            {title && <h1 style={titleStyle}>{title}</h1>}
            {action && <div style={actionStyle}>{action}</div>}
          </div>
          <div style={rowStyle}>
            {content && <div style={contentStyle}>{content}</div>}
            {extraContent && (
              <div style={extraContentStyle}>{extraContent}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
