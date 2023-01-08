import { View } from 'react-native';

const collisionDetection = (bird, obstacles) => {
  // Check if the bird is colliding with any of the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (
      bird.x < obstacle.x + obstacle.width &&
      bird.x + bird.width > obstacle.x &&
      bird.y < obstacle.y + obstacle.height &&
      bird.y + bird.height > obstacle.y
    ) {
      // The bird is colliding with the obstacle
      return true;
    }
  }

  // The bird is not colliding with any obstacles
  return false;
};

const App = () => {
  const bird = { x: 50, y: 50, width: 50, height: 50 };
  const obstacles = [
    { x: 100, y: 0, width: 50, height: 200 },
    { x: 200, y: 0, width: 50, height: 300 },
    { x: 300, y: 0, width: 50, height: 250 },
  ];

  if (collisionDetection(bird, obstacles)) {
    console.log('Game over! The bird collided with an obstacle.');
  } else {
    console.log('Keep playing!');
  }
};
export default collisionDetection;