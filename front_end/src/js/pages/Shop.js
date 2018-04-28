import React, { Component, Fragment } from 'react'
import { Button, Icon, Input, Layout, Radio, } from 'antd'
import ShopItemHeader from "../components/presentational/ShopItemHeader";
import ShopItemCard from "../components/presentational/ShopItemCard";

const { Content } = Layout
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;


class Shop extends Component {

  state = {
    radioValue: 'all',
  }

  radioOnChange(e) {
    this.setState({ radioValue: e.target.value })
  }

  onSearch() {
    console.log(`selecting ${this.state.radioValue}`)
    console.log('search')
  }

  render() {

    const BuyButton = () => (
      <Button onClick={ () => console.log('buy') }
              icon="shopping-cart"/>
    )

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 1,
      total: 1,
    }

    const { list, loading } = this.props

    const extraContent = (
      <div>
        <RadioGroup value={ this.state.radioValue } onChange={ (e) => this.radioOnChange(e) }>
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="clothes">Clothes</RadioButton>
          <RadioButton value="accessories">Accessories</RadioButton>
        </RadioGroup>
        <Search style={ { marginLeft: '16px', width: '272px' } }
                placeholder="Search"
                onSearch={ () => this.onSearch() }
                enterButton/>
      </div>
    )


    return (
      <Layout>
        <Content style={ { margin: '24px 24px 0', height: '100%' } }>
          <Fragment>
            <div>
              <ShopItemHeader leftTitle="Coins"
                              leftValue="100"
                              midTitle="Gems"
                              midValue="100"
                              rightTitle="Owned Items"
                              rightValue="100"/>

              <ShopItemCard extraContent={ extraContent }
                            title="Shop"
                            loading={ loading }
                            list={ list }
                            itemActions={ [<BuyButton/>] }
                            paginationProps={ paginationProps }
              />
            </div>
          </Fragment>
        </Content>
      </Layout>
    )
  }
}

export default Shop
