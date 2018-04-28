import React from 'react'
import { Card } from 'antd'

const { Meta } = Card

const ItemCard = ({
                    coverImageSource,
                    metaTitle,
                    metaDescription,
                    ...rest
                  }) => {
  return (
    <Card
      hoverable
      cover={ <img alt="image" src={ coverImageSource }/> }
      { ...rest }
    >
      <Meta
        title={ metaTitle }
        description={ metaDescription }
      />
    </Card>
  )
}

export default ItemCard