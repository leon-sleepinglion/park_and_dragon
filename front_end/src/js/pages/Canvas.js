import React from 'react'
import { Button, Card } from 'antd'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { Loop, Stage, TileMap } from 'react-game-kit'
import character1 from '../../assets/character1.png'
import burger1 from '../../assets/burger1.png'
import burger2 from '../../assets/burger2.png'
import burger3 from '../../assets/burger3.png'
import ff1 from '../../assets/ff1.png'
import icecream1 from '../../assets/icecream1.png'
import nugget1 from '../../assets/nugget1.png'
import background1 from '../../assets/background1.png'
import soundEffect from '../../assets/sound.wav'
import gameover from '../../assets/gameover.wav'
import PropTypes from 'prop-types'

const images = [
  burger1,
  burger2,
  burger3,
  ff1,
  icecream1,
  nugget1
]

const randomIndex = (length) => {
  return Math.floor(Math.random() * length)
}

const clamp = (num, min, max) => {
  return num <= min ? min : num >= max ? max : num
}

const stageWidth = 360
const stageHeight = 640
const playerTileSize = 64
const obstacleTileSize = 48
const obstacleBoundY = stageHeight - obstacleTileSize - 60

const playerX = (stageWidth - playerTileSize) / 2
const playerY = stageHeight - playerTileSize - 90

export default class Canvas extends React.Component {
  state = {
    timer: -1000,
    score: 0,
    currentPlayerX: 0,
    currentPlayerY: 0,
    obstacles: {},
    obstacleCount: 0,
    maxObstacles: 10,
    dropSpeed: 5,
    updateScore: false,
    playGameOver: false,
    played: false
  }

  constructor() {
    super()

    const interval = 500
    const dropSpeedIncreaseInterval = 5000

    setInterval(() => this.createObstacle(), interval)
    setInterval(
      () => this.setState({ dropSpeed: this.state.dropSpeed + 1 }),
      dropSpeedIncreaseInterval
    )
    setInterval(() => {
        const newTimer = this.state.timer - 1
        // const newPlayGameOver = newTimer <= 0 && this.state.played
        this.setState({ timer: newTimer })
      }
      , 1000)
  }

  createObstacle() {
    if (this.state.obstacleCount < this.state.maxObstacles){
      this.state.obstacles[this.state.obstacleCount] = {
        x: clamp(Math.random() * stageWidth, 0, stageWidth - obstacleTileSize),
        y: -obstacleTileSize,
        id: this.state.obstacleCount,
        src: images[randomIndex(images.length)]
      }

      this.setState({
        obstacleCount: this.state.obstacleCount + 1,
        obstacles: this.state.obstacles
      })
    }
  }

  addScore() {
    this.setState({ score: this.state.score + 1 })
  }

  resetScore() {
    this.setState({
      timer: 10,
      score: 0,
      currentPlayerX: playerX,
      currentPlayerY: playerY,
      obstacles: {},
      obstacleCount: 0,
      maxObstacles: 10,
      dropSpeed: 5,
      updateScore: false,
      played: true
    })
  }

  handleCollision() {
    if (this.state.timer > 0){
      this.addScore()
    }
  }

  handleOnMouseMove(e) {
    let rect = null
    if (this.myInput) rect = this.myInput.getBoundingClientRect()
    else rect = e.target.getBoundingClientRect()

    const x = e.clientX - rect.left
    this.setState({
      currentPlayerX: x - playerTileSize / 2,
      currentPlayerY: playerY
    })
  }

  handleGameEnd() {
    if (this.state.played)
      this.setState({ playGameOver: true, played: false })
  }

  handleSongFinishedPlaying() {
    this.setState({ playGameOver: false })
  }

  render() {
    return (
      <div ref={ input => {
        this.myInput = input
      } }
           style={ {
             width: stageWidth,
             height: stageHeight,
             marginLeft: 'auto',
             marginRight: 'auto'
           } }
           onMouseMove={ (e) => this.handleOnMouseMove(e) }>
        <Loop>
          <Timer onGameEnd={ () => this.handleGameEnd() }
                 timer={ this.state.timer }/>
          { this.state.timer > 0 ?
            <Stage width={ stageWidth } height={ stageHeight }>
              <Background/>
              <Player x={ this.state.currentPlayerX }
                      y={ this.state.currentPlayerY }
                      tileSize={ playerTileSize }/>
              { Object.entries(this.state.obstacles).map((item) => {
                const [index, ob] = item
                return (
                  <Obstacle obstacleID={ index }
                            x={ ob.x }
                            y={ ob.y }
                            handleCollision={ () => this.handleCollision() }
                            playerX={ this.state.currentPlayerX }
                            playerY={ this.state.currentPlayerY }
                            playerWidth={ playerTileSize }
                            playerHeight={ playerTileSize }
                            dropSpeed={ this.state.dropSpeed }
                            tileSize={ obstacleTileSize }
                            key={ `ob${index}` }
                            src={ ob.src }
                            timer={ this.state.timer }/>
                )
              }) }
              <Score x={ 10 }
                     y={ 10 }
                     score={ this.state.score }
                     timer={ this.state.timer }/>
            </Stage>
            :
            <Card title={ "Play" }>
              <p>{ `Your score: ${this.state.score}` }</p>
              <Button onClick={ () => this.resetScore() }>Start game</Button>
              { this.state.playGameOver ? <Sound
                url={ gameover }
                playStatus={ Sound.status.PLAYING }
                onFinishedPlaying={ () => this.handleSongFinishedPlaying() }
                onStop={ () => this.handleSongFinishedPlaying() }
              /> : null }
            </Card>
          }
        </Loop>
      </div>
    )
  }
}

class Timer extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
  };

  loop = () => {
    //Do stuff here
    if (this.props.timer !== -1000 && this.props.timer <= 0)
      this.props.onGameEnd()
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  render() {
    return (
      <div/>
    )
  }
}

class Background extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
  };

  loop = () => {
    //Do stuff here
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  render() {
    return (
      <div style={ {
        transform: `translate(${0}px, ${0}px)`,
      } }>
        <TileMap
          src={ background1 }
          tileSize={ 720 }
          columns={ 1 }
          rows={ 1 }
          layers={ [[1]] }
        />
      </div>
    )
  }
}

class Score extends React.Component {
  static contextTypes = {
    loop: PropTypes.object
  }

  state = {
    x: this.props.x,
    y: this.props.y
  }

  loop = () => {
    //Do stuff here
    if (this.props.timer <= 0)
      this.props.onGameEnd()
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop)
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID)
  }

  render() {
    return (
      <h1
        style={ { transform: `translate(${this.state.x}px, ${this.state.y}px)` } }
      >
        { `Score: ${this.props.score}       Timer: ${this.props.timer}` }
      </h1>
    )
  }
}

class Obstacle extends React.Component {
  static contextTypes = {
    loop: PropTypes.object
  }

  state = {
    x: this.props.x,
    y: this.props.y,
    playSound: false
  }

  checkForCollision() {
    const playerX = this.props.playerX
    const playerY = this.props.playerY
    const playerW = this.props.playerWidth
    const playerH = this.props.playerHeight

    const thisX = this.state.x
    const thisY = this.state.y
    const tileSize = this.props.tileSize

    if (
      playerX < thisX + tileSize &&
      playerX + playerW > thisX &&
      playerY < thisY + tileSize &&
      playerH + playerY > thisY){
      this.props.handleCollision()
      this.setState({
        x: clamp(Math.random() * stageWidth, 0, stageWidth - obstacleTileSize),
        y: -obstacleTileSize,
        playSound: true
      })
    }
  }

  loop = () => {
    //Do stuff here
    if (this.props.timer > 0){
      this.checkForCollision()
      if (this.state.y + this.props.tileSize > obstacleBoundY){
        this.setState({
          x: clamp(Math.random() * stageWidth, 0, stageWidth - obstacleTileSize),
          y: -obstacleTileSize
        })
      } else {
        this.setState({
          y: this.state.y + this.props.dropSpeed
        })
      }
    }
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop)
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID)
  }

  handleSongFinishedPlaying() {
    this.setState({ playSound: false })
  }

  render() {
    return (
      <div
        style={ { transform: `translate(${this.state.x}px, ${this.state.y}px)` } }
      >
        <TileMap
          src={ this.props.src }
          tileSize={ this.props.tileSize }
          columns={ 1 }
          rows={ 1 }
          layers={ [[1]] }
        />
        { this.state.playSound && <Sound
          url={ soundEffect }
          playStatus={ Sound.status.PLAYING }
          onFinishedPlaying={ () => this.handleSongFinishedPlaying() }
        /> }
      </div>
    )
  }
}

class _Player extends React.Component {
  static contextTypes = {
    loop: PropTypes.object
  }
  loop = () => {
    //Do stuff here
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop)
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID)
  }

  render() {
    const { character } = this.props
    return (
      <div
        style={ { transform: `translate(${this.props.x}px, ${this.props.y}px)` } }
      >
        <TileMap
          src={ character }
          tileSize={ this.props.tileSize }
          columns={ 1 }
          rows={ 1 }
          layers={ [[1]] }
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  character: state.user.pic
})

const Player = connect(mapStateToProps)(_Player)
