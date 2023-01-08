import React, { UseRef, useState } from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity, Animated, LayoutAnimation, StyleSheet } from 'react-native';
import { MovingObstacle } from './objects/MovingObstacle';
import { collisionDetection } from './objects/collisionDetection';
import useInterval from './objects/useInterval';

const FlappyBird = () => {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const birdRef = React.createRef(null);
  const backgroundRef = React.createRef(null);
  const groundRef = React.createRef(null);
  const obstaclesRef = React.createRef(null);
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: screenWidth,
      height: screenHeight,
    },
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
    gameOverContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gameOverText: {
      fontSize: 30,
      color: 'white',
    },
  });

  const startGame = () => {
    // Reset game state
    setGameOver(false);
    setScore(0);
    obstaclesRef.current = [];
    birdRef.current.setNativeProps({ top: 0 });
    backgroundRef.current.setNativeProps({ left: 0 });
    groundRef.current.setNativeProps({ left: 0 });

    // Start game loop
    useInterval(() => {
        // Animate bird
        LayoutAnimation.spring();
        birdRef.current.setNativeProps({ rotate: birdRef.current.props.rotate + 5 
    });
        // Animate background and ground
        LayoutAnimation.configureNext({
          update: {
            duration: 500,
            type: LayoutAnimation.Types.easeOut,
          }
        });
        backgroundRef.current.setNativeProps({ left: backgroundRef.current.props.left - 5 });
        groundRef.current.setNativeProps({ left: groundRef.current.props.left - 5 
    });

      // Animate obstacles
      obstaclesRef.current.forEach(obstacleRef => {
        LayoutAnimation.configureNext({
          update: {
            duration: 500,
            type: LayoutAnimation.Types.easeOut,
          }
        });
        obstacleRef.setNativeProps({ left: obstacleRef.props.left - 5 });
      });

        // Check for collisions
        const birdCoords = birdRef.current.getNodeHandle();
        if (collisionDetection(birdCoords, obstaclesRef.current)) {
          endGame();
        }
      }, 1000 / 60);
    };
    const endGame = () => {
      clearInterval(timer);
      setGameOver(true);
    };
    const onPress = () => {
      LayoutAnimation.spring();
      birdRef.current.setNativeProps({ rotate: -20 });
    };

    return (
      <View>
      {/* Display game over screen if game is over */}
      {gameOver && (
        <Modal>
          <Text>Game Over</Text>
          <TouchableOpacity onPress={startGame}>
            <Text>Play Again</Text>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Display background */}
      <Image
        ref={backgroundRef}
        source={require('./assets/background.png')}
        style={styles.background}
      />

      {/* Display obstacles */}
      {obstaclesRef.current ? obstaclesRef.current.map((obstacle, index) => (
        <MovingObstacle 
          key={index} ref={obstacle} />
      )) : null}

      {/* Display ground */}
      <Image
        ref={groundRef}
        source={require('./assets/ground.png')}
        style={styles.ground}
      />
      {/* Display bird */}
      <Animated.Image
        ref={birdRef}
        source={require('./assets/bird.png')}
        style={styles.bird}
      />
      {/* Handle user input */}
      <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Text>{score}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default FlappyBird;