import React, { useState, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';

const Ground = ({
  xPosGround,
  groundBottom,
  groundWidth,
  groundHeight
}) => {

  return(
    <>
    <Animated.View style={{
          position: 'absolute',
          //backgroundColor: 'green',
          width: groundWidth,
          height: groundHeight,
          left: xPosGround,
          bottom: groundBottom
        }}>
          <Image source={require('../assets/ground.png')} style={{ flex: 1}} resizeMode='cover'/>
          </Animated.View>
    </>
  )
}
export default Ground;

/*
import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const FlappyBird = () => {
  const screenWidth = Dimensions.get('screen').width;
  const [xPos, setXPos] = useState(screenWidth);
  const speed = 5; // scroll speed in pixels per frame

  const updatePosition = () => {
    // Check if image has scrolled off the left side of the screen
    if (xPos + imageWidth < 0) {
      // If so, reset position to the right of the screen
      setXPos(screenWidth);
    } else {
      // Otherwise, update position based on scroll speed
      setXPos(xPos - speed);
    }
  };

  // Start game loop
  useInterval(updatePosition, 1000 / 60); // 60 frames per second

  return (
    <View>
      <Image
        style={{
          position: 'absolute',
          left: xPos,
          top: 0,
          width: imageWidth,
          height: imageHeight,
        }}
        source={require('./myImage.png')}
      />
    </View>
  );
};
*/
