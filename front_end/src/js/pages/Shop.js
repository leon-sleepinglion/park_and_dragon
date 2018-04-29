import React, { Component } from 'react'
import { Button, Input, Layout, Radio } from 'antd'
import ShopItemHeader from '../components/presentational/ShopItemHeader'
import ShopItemCard from '../components/presentational/ShopItemCard'
import { withShopAction } from '../components/container'

const { Content } = Layout
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { Search } = Input

class Shop extends Component {
  state = {
    radioValue: 'all'
  }

  radioOnChange = e => this.setState({ radioValue: e.target.value })

  onSearch() {
    console.log(`selecting ${this.state.radioValue}`)
    console.log('search')
  }

  filter = () =>
    this.state.radioValue === 'in-game'
      ? this.props.items.filter(item => item.category === 'in-game')
      : this.state.radioValue === 'rewards'
        ? this.props.items.filter(item => item.category === 'rewards')
        : this.props.items

  render() {
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 1,
      total: 1
    }

    const { loading, buyItem, coins, gems, inventoryCount } = this.props

    const extraContent = (
      <div>
        <RadioGroup
          value={this.state.radioValue}
          onChange={e => this.radioOnChange(e)}
        >
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="in-game">In-Game</RadioButton>
          <RadioButton value="rewards">Rewards</RadioButton>
        </RadioGroup>
        <Search
          style={{ marginLeft: '16px', width: '272px' }}
          placeholder="Search"
          onSearch={() => this.onSearch()}
          enterButton
        />
      </div>
    )

    return (
      <Layout>
        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          <ShopItemHeader
            leftTitle="Coins"
            leftValue={coins}
            midTitle="Gems"
            midValue={gems}
            rightTitle="Owned Items"
            rightValue={inventoryCount}
          />
          <ShopItemCard
            extraContent={extraContent}
            title="Shop"
            loading={loading}
            list={this.filter()}
            itemActions={id => [
              <Button onClick={() => buyItem(id)} icon="shopping-cart" />
            ]}
            paginationProps={paginationProps}
          />
        </Content>
      </Layout>
    )
  }
}

export default withShopAction(Shop)
