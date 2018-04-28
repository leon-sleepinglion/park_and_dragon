import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

export default class Blank extends React.Component {
  state = {
    contentHeight: 0
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

  render() {
    const { contentHeight } = this.state
    const { header, content, footer } = this.props.config
    return (
      <Layout>
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
    )
  }
}
