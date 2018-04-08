import Obstacle from './Obstacle';

const sprite = [
  {
    name: 'rock',
    x: 1044,
    y: 213,
    width: 92,
    height: 44,
    flipped: 0
  }
];

export default class Rock extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = 0;
  }
}
