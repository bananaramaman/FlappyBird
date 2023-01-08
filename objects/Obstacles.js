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
    <View style={{
        position: 'absolute',
        backgroundColor: 'green',
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstacleOne,
        bottom: HeightVariation,
      }}/>

      <Animated.View style={{
        position: 'absolute',
        backgroundColor: 'green',
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstacleOne,
        bottom: HeightVariation + obstacleHeight + gap,
      }}/>
    </>
  )
}
export default Obstacles;
/*
<Image source={require('../assets/obstacle.png')} />
</Animated.View>
</>
*/