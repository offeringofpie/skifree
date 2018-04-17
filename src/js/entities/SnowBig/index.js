import Obstacle from '../Obstacle';

const sprite = [
  {
    name: 'snowBig',
    x: 1002,
    y: 260,
    width: 253,
    height: 124,
    flipped: 0
  }
];

export default class SnowBig extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = 0;
  }
}
