import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, LayoutAnimation } from 'react-native';
import { obstacleX } from './MovingObstacle';

const ANIMATION_DURATION = 1000;

const FlappyBird = () => {
  const [birdY, setBirdY] = useState(0);
  const [birdRotation, setBirdRotation] = useState(new Animated.Value(0));
  const [gameOver, setGameOver] = useState(false);

  const onPress = () => {
    // Make the bird flap its wings
    LayoutAnimation.configureNext({
      duration: ANIMATION_DURATION,
      update: {
        type: LayoutAnimation.Types.easeInOut,
      },
    });
    setBirdY(birdY - 50);

    // Animate the rotation of the bird
    Animated.timing(birdRotation, {
      toValue: -45,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      LayoutAnimation.configureNext({
        duration: ANIMATION_DURATION,
        update: {
          type: LayoutAnimation.Types.easeInOut,
        },
      });
      setBirdY(birdY + 50);
      Animated.timing(birdRotation, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('./assets/background.png')} />
      <View style={styles.obstaclesContainer}>
        {/* Render the obstacles here */}
      </View>
      <Animated.Image
        style={[styles.bird, { top: birdY, transform: [{ rotate: `45deg` }] }]}
        source={require('./assets/bird.png')}
      />
      <Image style={styles.ground} source={require('./assets/ground.png')} />
      <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.touchable}>
        <View />
      </TouchableOpacity>
      {gameOver && (
        <Modal>
          <Text>Game Over!</Text>
          <Button title="Play Again" onPress={() => setGameOver(false)} />
        </Modal>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
      // ... other styles here
  bird: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 100,
  },
  touchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
};
  export default FlappyBird;  