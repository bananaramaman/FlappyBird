import React, { useState, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';

const Obstacles = ({
  obstacleOne,
  obstacleWidth, 
  obstacleHeight, 
  gap,
  HeightVariation
}) => {

  return(
    <>
    <Animated.View style={{
        position: 'absolute',
        //backgroundColor: 'green',
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstacleOne,
        bottom: HeightVariation,
      }}>
        <Image source={require('../assets/obstacleOne.png')}  style={{ flex: 1}} resizeMode="cover"/>
        </Animated.View>

      <Animated.View style={{
        position: 'absolute',
        //backgroundColor: 'green',
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstacleOne,
        bottom: HeightVariation + obstacleHeight + gap,
      }}>
        <Image source={require('../assets/obstacleTwo.png')} style={{ flex: 1}} resizeMode="cover"/>
        </Animated.View>
    </>
  )
}
export default Obstacles;
/*
<Image source={require('../assets/obstacle.png')} />
</Animated.View>
</>

<View style={{ width: 100, height: 100 }}>
  <Image source={...} style={{ flex: 1 }} resizeMode="contain" />
</View>

*/