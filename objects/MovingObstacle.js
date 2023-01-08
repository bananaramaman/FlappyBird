import React, { useState, useEffect } from 'react';
import { View, Image, LayoutAnimation, Animated } from 'react-native';

const ANIMATION_DURATION = 5000;

const MovingObstacle = ({ x, y, width, height }) => {
  const [obstacleX] = useState(new Animated.Value(x));

  useEffect(() => {
    // Animate the movement of the obstacle across the screen
    Animated.timing(obstacleX, {
      toValue: -500,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ top: y, transform: [{ translateX: obstacleX }], width, height }}>
      <Image source={require('../assets/obstacle.png')} />
    </Animated.View>
  );
};

export default MovingObstacle;