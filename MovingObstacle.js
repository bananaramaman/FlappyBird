const ANIMATION_DURATION = 1000;

const MovingObstacle = ({ x, y, width, height }) => {
  const [obstacleX] = useState(new Animated.Value(x));

  useEffect(() => {
    // Animate the movement of the obstacle across the screen
    Animated.timing(obstacleX, {
      toValue: -width,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    const obstacleX = [
      { x: 300, y: 0, width: 50, height: 200 },
      { x: 600, y: 0, width: 50, height: 300 },
      { x: 900, y: 0, width: 50, height: 250 },
    ];
  }, []);

  return (
    <Animated.View style={{ top: y, left: obstacleX, width, height }}>
      <Image source={require('./assets/obstacle.png')} />
    </Animated.View>
  );
};

export default MovingObstacle;
