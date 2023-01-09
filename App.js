import React, { useEffect, useState } from 'react'
import {StyleSheet, View, Dimensions, Text, Image, TouchableWithoutFeedback, Animated, LayoutAnimation } from 'react-native'
import Bird from './objects/Bird'
import Obstacles from './objects/Obstacles'
import Environment from './objects/Environment'
import Ground from './objects/Ground'

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom ] = useState(screenHeight/2)
  const [obstacleOne, setObstaclesOne] = useState(screenWidth)
  const [obstacleTwo, setObstaclesTwo] = useState(screenWidth + screenWidth/2 + 60)
  const [obstacleHeightV, setObstaclesHeightV] = useState(0)
  const [obstacleHeightV2, setObstaclesHeightV2] = useState(0)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(5)
  const obstacleWidth = 120
  const obstacleHeight = screenHeight/2
  const gap = 200
  const gravity =3
  const [xPosBackground, setXPosBackground] = useState(0)
  const [xPosBackground2, setXPosBackground2] = useState(backgroundWidth)
  const [xPosGround, setXPosGround] = useState(-screenWidth/2)
  const [xPosGround2, setXPosGround2] = useState(-screenWidth/2 + screenWidth)
  const backgroundWidth = 1022
  const backgroungHeight = screenHeight
  const backgroundBottom = -100
  const groundWidth = screenWidth
  const groundHeight = 50
  const groundBottom = 0
  let gameTimerId
  let obstacleOneTimerId
  let obstacleTwoTimerId
  let groundTimerId
  let groundTimerId2
  let backgroundTimerId
  const [isGameOver, setIsGameOver] = useState(false)

  //////////////////////////////////// start the bird falling ////////////////////////////////////
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])
  //console.log(birdBottom)

  ////////////////////////////////////// Jump function
  const jump = () =>{
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      //console.log('jumped')
    }
  }
  //////////////////////////////////// Animate background and ground ////////////////////////////////////

  useEffect(() => {
    if (xPosBackground > -backgroundWidth) {
      backgroundTimerId = setInterval(() => {
        setXPosBackground(xPosBackground => xPosBackground - (speed/3))
      },30)
      return () => {
        clearInterval(backgroundTimerId)
      }
    } else {
      setXPosBackground(backgroundWidth)
    }
  }, [xPosBackground])
  //console.log(xPosBackground)

  useEffect(() => {
    if (xPosBackground2 > -backgroundWidth) {
      backgroundTimerId2 = setInterval(() => {
        setXPosBackground2(xPosBackground2 => xPosBackground2 - (speed/3))
      },30)
      return () => {
        clearInterval(backgroundTimerId2)
      }
    } else {
      setXPosBackground2(backgroundWidth)
    }
  }, [xPosBackground2])

  useEffect(() => {
    if (xPosGround > -groundWidth) {
      groundTimerId = setInterval(() => {
        setXPosGround(xPosGround => xPosGround -speed)
      },30)
      return () => {
        clearInterval(groundTimerId)
      }
    } else {
      setXPosGround(screenWidth)
    }
  }, [xPosGround])
  //console.log(xPosGround)

  useEffect(() => {
    if (xPosGround2 > -groundWidth) {
      groundTimerId2 = setInterval(() => {
        setXPosGround2(xPosGround2 => xPosGround2 -speed)
      },30)
      return () => {
        clearInterval(groundTimerId2)
      }
    } else {
      setXPosGround2(screenWidth)
    }
  }, [xPosGround2])
  //console.log(xPosGround2)


  //////////////////////////////////// first obstacles animation funtion ////////////////////////////////////
  useEffect(() => {
    if (obstacleOne > -obstacleWidth) {
      obstacleOneTimerId = setInterval(() => {
        setObstaclesOne(obstacleOne => obstacleOne -speed)
      },30)
      return () => {
        clearInterval(obstacleOneTimerId)
      }
    } else {
      setObstaclesOne(screenWidth)
      setObstaclesHeightV(- Math.random()*150)
      setScore(score => score + 1)
    }
  }, [obstacleOne])
  //console.log(obstacleOne)

   //////////////////////////////////// second obstacles animation funtion ////////////////////////////////////
   useEffect(() => {
    if (obstacleTwo > -obstacleWidth) {
      obstacleTwoTimerId = setInterval(() => {
        setObstaclesTwo(obstacleTwo => obstacleTwo -speed)
      },30)
      return () => {
        clearInterval(obstacleTwoTimerId)
      }
    } else {
      setObstaclesTwo(screenWidth)
      setObstaclesHeightV2(- Math.random()*200)
      setScore(score => score + 1)
    }
  }, [obstacleTwo])
  //console.log(obstacleTwo)


  



  ///////////////////////////////////// collision check function ////////////////////////////////////
  useEffect(() => {
    if (
    ((birdBottom < (obstacleHeightV + obstacleHeight + 0) ||
    birdBottom > (obstacleHeightV + obstacleHeight + gap -50)) &&
    (obstacleOne > screenWidth/2 -60 && obstacleOne < screenWidth/2 + 30)
    )
    ||
    ((birdBottom < (obstacleHeightV2 + obstacleHeight + 0) ||
    birdBottom > (obstacleHeightV2 + obstacleHeight + gap -50)) &&
    (obstacleTwo > screenWidth/2 -60 && obstacleTwo < screenWidth/2 + 30)
    )
    )
    {
    console.log('game over')
    gameOver()
    }
  })

  //////////////////////////////////// clear timers on game over
  const gameOver = () => {
      clearInterval(gameTimerId)
      clearInterval(obstacleOneTimerId)
      clearInterval(obstacleTwoTimerId)
      clearInterval(backgroundTimerId)
      clearInterval(backgroundTimerId2)
      clearInterval(groundTimerId)
      clearInterval(groundTimerId2)
      setIsGameOver(true)
  }

  return (
    <TouchableWithoutFeedback onPress = {jump}>
      <View style={styles.container}>
      <Environment
        backgroundWidth={backgroundWidth}
        backgroundHeight={backgroungHeight}
        backgroundBottom={backgroundBottom}
        xPosBackground={xPosBackground}
      />
      <Environment
        backgroundWidth={backgroundWidth}
        backgroundHeight={backgroungHeight}
        backgroundBottom={backgroundBottom}
        xPosBackground={xPosBackground2}
      />
      {isGameOver && <Text>{score}</Text>}
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />
      <Obstacles 
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        HeightVariation={obstacleHeightV}
        gap={gap}
        obstacleOne={obstacleOne}
      />
      <Obstacles 
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        HeightVariation={obstacleHeightV2}
        gap={gap}
        obstacleOne={obstacleTwo}
      />
      <Ground
        groundWidth={groundWidth}
        groundHeight={groundHeight}
        groundBottom={groundBottom}
        xPosGround={xPosGround}
      />
      <Ground
        groundWidth={groundWidth}
        groundHeight={groundHeight}
        groundBottom={groundBottom}
        xPosGround={xPosGround2}
      />
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E7CA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});