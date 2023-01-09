import React, { useState, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';

const Environment = ({
    xPosBackground,
    backgroundWidth,
    backgroundHeight,
    backgroundBottom
  }) => {
  
    return(
      <>
      <Animated.View style={{
            position: 'absolute',
            //backgroundColor: 'green',
            width: backgroundWidth,
            height: backgroundHeight,
            bottom: backgroundBottom,
            left: xPosBackground,
          }}>
            <Image source={require('../assets/background.png')} style={{ flex: 1}} resizeMode='contain'/>
            </Animated.View>
      </>
    )
  }
export default Environment;