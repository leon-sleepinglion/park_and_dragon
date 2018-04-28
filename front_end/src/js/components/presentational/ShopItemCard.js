import React from 'react'
import { Card, List, Avatar } from 'antd'
import moment from 'moment'

const listContentItemStyle = {
  color: 'rgba(0,0,0,0.45)',
  display: 'inline-block',
  verticalAlign: 'middle',
  fontSize: '14px',
  marginLeft: '40px'
}

const ShopItemCard = ({
                        title,
                        loading,
                          list,
                        extraContent,
                        itemActions,
                        paginationProps
                      }) => {

  const ListContent = ({ data: { owner, createdAt } }) => (
    <div style={ { marginLeft: 0 } }>
      <div style={ { marginLeft: 0, fontSize: 0 } }>
        <span>Owner</span>
        <p>{ owner }</p>
      </div>
      <div style={ listContentItemStyle }>
        <span style={ { lineHeight: '20px' } }>Created At</span>
        <p style={ { marginTop: '4px', marginBottom: 0, lineHeight: '22px' } }>
          { moment(createdAt).format('YYYY-MM-DD HH:mm') }
        </p>
      </div>
    </div>
  )

  return (
    <Card
      bordered={ false }
      title={ title }
      style={ { marginTop: 24 } }
      bodyStyle={ { padding: '0 32px 40px 32px' } }
      extra={ extraContent }
    >
      <List
        size="large"
        rowKey="id"
        loading={ loading }
        pagination={ paginationProps }
        dataSource={ list }
        renderItem={ item => (
          <List.Item actions={ itemActions }>
            <List.Item.Meta
              avatar={ <Avatar src={ item.logo } shape="square" size="large"/> }
              title={ item.title }
              description={ item.subDescription }
            />
            <ListContent data={ item }/>
          </List.Item>
        ) }
      />
    </Card>)
}

export default ShopItemCard