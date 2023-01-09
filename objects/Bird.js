import React, { useState, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';

const birdWidth = 50;
const birdHeight = 50;

const Bird = ({ birdBottom, birdLeft }) => {
  return (
    <>
    <Animated.View style={{
      position: 'absolute',
      //backgroundColor: 'green',
      width: birdWidth,
      height: birdHeight,
      left: birdLeft - (birdWidth / 2),
      bottom: birdBottom 
      }}>
        <Image 
        style={{ 
          flex: 1,
          transform: [{scale: 1.3}],
          }} 
        resizeMode="cover" 
        source={require('../assets/bird.png')}
        />
        </Animated.View>
    </>
  )
}

export default Bird;
