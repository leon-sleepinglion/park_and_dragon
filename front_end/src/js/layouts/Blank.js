import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

const background = [
  'http://68.media.tumblr.com/2469a3bffe4c8c97f9a34768db55a1eb/tumblr_noy6woQBtr1qze3hdo1_r2_500.gif',
  'http://68.media.tumblr.com/063481f87ba3058c8bb235148df090b9/tumblr_nb8zykBVPC1qze3hdo1_r1_500.gif',
  'http://68.media.tumblr.com/09c6d90170076846bdb19de05e08a8ca/tumblr_ol3lldvM801qze3hdo1_r1_500.gif',
  'http://68.media.tumblr.com/a1971a640a7c31496b83b4368b7af2d3/tumblr_oa5kbyhVQh1qze3hdo1_500.gif',
  'http://68.media.tumblr.com/dba8930c075bf505728df757c37b4216/tumblr_oh8awjk7lA1qze3hdo1_r1_500.gif',
  'http://68.media.tumblr.com/74f3a108bc59636cc3e48cbd005216d8/tumblr_n9m262J4Lq1qze3hdo1_r2_500.gif',
  'http://68.media.tumblr.com/734ba6db5941cd39f175f61ccf33b980/tumblr_nmvrs6ubl71qze3hdo1_r1_500.gif',
  'http://68.media.tumblr.com/16dee2fb087bcacd529b9c455f145ca8/tumblr_n9zgffvOOr1qze3hdo2_r1_500.gif'
]

const getBackgroundURL = () =>
  background[Math.floor(Math.random() * background.length)]

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
      <Layout
        style={{
          background: `url("${getBackgroundURL()}") center center / cover no-repeat fixed`,
          imageRendering: 'pixelated'
        }}
      >
        <Header ref={header => (this.header = header)} style={header.style}>
          <Link to="/">
            <h1>{header.content}</h1>
          </Link>
        </Header>
        <Content
          ref={content => (this.content = content)}
          style={{
            ...content.style,
            minHeight: contentHeight
          }}
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
