import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Header, Content, Footer, Sider } = Layout

class Main extends React.Component {
  state = {
    contentHeight: 0,
    layoutMargin: 200,
    siderCollapsed: true
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateContentHeight)
    this.updateContentHeight()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateContentHeight)
  }

  updateContentHeight = () =>
    this.setState({
      contentHeight:
        window.innerHeight -
        ReactDOM.findDOMNode(this.header).clientHeight -
        ReactDOM.findDOMNode(this.footer).clientHeight -
        parseInt(
          window
            .getComputedStyle(ReactDOM.findDOMNode(this.content))
            .getPropertyValue('margin-top')
            .slice(0, -2),
          10
        ) -
        parseInt(
          window
            .getComputedStyle(ReactDOM.findDOMNode(this.content))
            .getPropertyValue('margin-bottom')
            .slice(0, -2),
          10
        )
    })

  onSiderCollapse = siderCollapsed => {
    this.setState({ siderCollapsed })
  }

  render() {
    const { contentHeight, siderCollapsed } = this.state
    const { pathname } = this.props.location
    const { sider, header, content, footer } = this.props.config
    return (
      <Layout>
        <Sider
          ref={sider => (this.sider = sider)}
          style={sider.style}
          collapsible
          collapsed={siderCollapsed}
          onCollapse={this.onSiderCollapse}
        >
          <Menu
            theme={sider.theme}
            mode="inline"
            selectedKeys={[/^\/(\w*)(?=\/|$)/g.exec(pathname)[1]]}
          >
            {sider.item.map(item => (
              <Menu.Item key={item.key}>
                <Link to={`/${item.key}`}>
                  <Icon type={item.icon} />
                  <span>{item.description}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout
          style={{
            marginLeft: siderCollapsed ? 80 : 200,
            transition: 'margin-left 0.2s'
          }}
        >
          <Header ref={header => (this.header = header)} style={header.style}>
            <Link to="/">
              <h1>{header.content}</h1>
            </Link>
          </Header>
          <Content
            ref={content => (this.content = content)}
            style={{ ...content.style, minHeight: contentHeight }}
          >
            {this.props.children}
          </Content>
          <Footer ref={footer => (this.footer = footer)} style={footer.style}>
            {footer.content}
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Main)