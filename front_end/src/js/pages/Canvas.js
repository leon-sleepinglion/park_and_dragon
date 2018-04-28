import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Card, Button } from 'antd'
import { Loop, Stage, Sprite, World, Body, TileMap } from 'react-game-kit'
import character1 from '../../assets/character1.png'
import cone1 from '../../assets/cone1.png'
import cone2 from '../../assets/cone2.png'
import cone3 from '../../assets/cone3.png'
import PropTypes from 'prop-types'

const randomIndex = (length) => {
  return Math.floor(Math.random() * length)
}

const clamp = (num, min, max) => {
  return num <= min ? min : num >= max ? max : num;
}

const stageWidth = 360
const stageHeight = 640
const playerTileSize = 64
const obstacleTileSize = 32

const playerX = (stageWidth - playerTileSize) / 2
const playerY = stageHeight - playerTileSize

export default class Canvas extends React.Component {

  state = {
    timer: 0,
    score: 0,
    currentPlayerX: 0,
    currentPlayerY: 0,
    obstacles: {},
    obstacleCount: 0,
    maxObstacles: 10,
    dropSpeed: 5,
    updateScore: false,
  }

  constructor() {
    super()

    const interval = 500
    const dropSpeedIncreaseInterval = 5000

    setInterval(() => this.createObstacle(), interval)
    setInterval(() => this.setState({ dropSpeed: this.state.dropSpeed + 1 }), dropSpeedIncreaseInterval)
    setInterval(() => this.setState({ timer: this.state.timer - 1 }), 1000)

  }

  createObstacle() {


    if (this.state.obstacleCount < this.state.maxObstacles){
      const images = [
        cone1, cone2, cone3
      ]
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

  updatePlayerPosition(x, y) {
    this.setState({ currentPlayerX: x, currentPlayerY: y })
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
      updateScore: false
    })
  }

  resetObstacle(obstacleID) {
    this.state.obstacles[obstacleID] = {
      x: clamp(Math.random() * stageWidth, 0, stageWidth - obstacleTileSize),
      y: -obstacleTileSize,
      id: obstacleID
    }

    this.setState({ obstacles: this.state.obstacles })
  }

  handleCollision(obstacleID) {
    this.resetObstacle(obstacleID)
    this.addScore()
  }

  handleOnMouseMove(e) {
    let rect = null
    if (this.myInput)
      rect = this.myInput.getBoundingClientRect()
    else
      rect = e.target.getBoundingClientRect()

    const x = e.clientX - rect.left
    this.setState({ currentPlayerX: x - playerTileSize / 2, currentPlayerY: playerY })
  }

  render() {

    return (
      <div ref={ input => {
        this.myInput = input;
      } } style={ {
        width: stageWidth,
        height: stageHeight,
        marginLeft: 'auto',
        marginRight: 'auto'
      } }
           onMouseMove={ (e) => this.handleOnMouseMove(e) }>
        {
          this.state.timer > 0 ?
            <Loop>
              <Stage width={ stageWidth } height={ stageHeight }>
                <Player x={ this.state.currentPlayerX }
                        y={ this.state.currentPlayerY }
                        tileSize={ playerTileSize }/>
                { Object.entries(this.state.obstacles).map((item) => {
                  const [index, ob] = item
                  return (
                    <Obstacle obstacleID={ index }
                              x={ ob.x }
                              y={ ob.y }
                              handleOutOfStage={ (id) => this.resetObstacle(id) }
                              handleCollision={ (id) => this.handleCollision(id) }
                              playerX={ this.state.currentPlayerX }
                              playerY={ this.state.currentPlayerY }
                              playerWidth={ playerTileSize }
                              playerHeight={ playerTileSize }
                              dropSpeed={ this.state.dropSpeed }
                              tileSize={ obstacleTileSize }
                              key={ `ob${index}` }
                              src={ ob.src }/>
                  )
                }) }
                <Score x={ 10 }
                       y={ 10 }
                       score={ this.state.score }
                       timer={ this.state.timer }/>
              </Stage>
            </Loop> :
            <Card title={ "Play" }>
              <p>{ `Your score: ${this.state.score}` }</p>
              <Button onClick={ () => this.resetScore() }>Start game</Button>
            </Card>
        }
      </div>
    )
  }
}

class Score extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
  };

  state = {
    x: this.props.x,
    y: this.props.y
  }

  loop = () => {
    //Do stuff here
  };

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  render() {
    return (
      <h1 style={ { transform: `translate(${this.state.x}px, ${this.state.y}px)` } }>
        { `Score: ${this.props.score}       Timer: ${this.props.timer}` }
      </h1>
    )
  }
}

class Obstacle extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
  };

  state = {
    x: this.props.x,
    y: this.props.y
  }

  checkForCollision() {
    const playerX = this.props.playerX
    const playerY = this.props.playerY
    const playerW = this.props.playerWidth
    const playerH = this.props.playerHeight

    const thisX = this.state.x
    const thisY = this.state.y
    const tileSize = this.props.tileSize

    if (playerX < thisX + tileSize &&
      playerX + playerW > thisX &&
      playerY < thisY + tileSize &&
      playerH + playerY > thisY)
      this.props.handleCollision(this.props.obstacleID)
  }

  loop = () => {
    //Do stuff here
    this.checkForCollision()
    if (this.state.y + this.props.tileSize > stageHeight){
      this.props.handleOutOfStage(this.props.obstacleID)
      this.setState({
        x: this.props.x,
        y: this.props.y
      })
    } else {
      this.setState({ y: this.state.y + this.props.dropSpeed })
    }
  };

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  render() {
    return (
      <div style={ { transform: `translate(${this.state.x}px, ${this.state.y}px)` } }>
        <TileMap
          src={ this.props.src }
          tileSize={ this.props.tileSize }
          columns={ 1 }
          rows={ 1 }
          layers={ [[1]] }
        />
      </div>
    )
  }
}

class _Player extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
  };
  loop = () => {
    //Do stuff here
  };

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  render() {
    const {character} = this.props
    return (
      <div style={ { transform: `translate(${this.props.x}px, ${this.props.y}px)` } }>
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