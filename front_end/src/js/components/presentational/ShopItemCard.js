import React from 'react'
import { Card, List, Avatar, Tag } from 'antd'

const listContentItemStyle = {
  color: 'rgba(0,0,0,0.45)',
  display: 'inline-block',
  verticalAlign: 'middle',
  fontSize: '14px',
  marginLeft: '32px',
  textAlign: 'center'
}

const ShopItemCard = ({
  title,
  loading,
  list,
  extraContent,
  itemActions,
  paginationProps
}) => {
  const ListContent = ({ data: { coins, gems, type } }) => (
    <div style={{ marginLeft: 0 }}>
      <div style={listContentItemStyle}>
        <Tag color="blue">Type</Tag>
        <p style={{ marginTop: '4px', marginBottom: 0, lineHeight: '22px' }}>
          {type}
        </p>
      </div>
      <div style={listContentItemStyle}>
        <Tag color="gold">Coins</Tag>
        <p
          style={{
            marginTop: '4px',
            marginBottom: 0,
            lineHeight: '22px'
          }}
        >
          {coins}
        </p>
      </div>

      <div style={listContentItemStyle}>
        <Tag color="purple">Gems</Tag>
        <p style={{ marginTop: '4px', marginBottom: 0, lineHeight: '22px' }}>
          {gems}
        </p>
      </div>
    </div>
  )

  return (
    <Card
      bordered={false}
      title={title}
      style={{ marginTop: 24 }}
      bodyStyle={{ padding: '0 32px 40px 32px' }}
      extra={extraContent}
    >
      <List
        size="large"
        rowKey="id"
        loading={loading}
        pagination={paginationProps}
        dataSource={list}
        renderItem={item => (
          <List.Item actions={itemActions(item.id)}>
            <List.Item.Meta
              avatar={<Avatar src={item.logo} shape="square" size="large" />}
              title={item.title}
              description={item.description}
            />
            <ListContent data={item} />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default ShopItemCard
