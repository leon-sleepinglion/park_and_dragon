import React from 'react'
import Header from './Header'

const UserProfileHeader = ({
                             title,
                             logoSize,
                             logoImageSource,
                             action,
                             description,
                             extraContent
                           }) => {
  return (
    <Header
      title={ title }
      logoSize={ logoSize }
      logoImageSource={ logoImageSource }
      action={ action }
      content={ description }
      extraContent={ extraContent }
    />
  )
}

export default UserProfileHeader