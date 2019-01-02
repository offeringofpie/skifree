import Obstacle from '../Obstacle';

const sprite = [
  {
    name: 'ramp',
    x: 1141,
    y: 228,
    width: 127,
    height: 28,
    flipped: 0
  }
];

export default class Ramp extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = 0;
    this.hit = 0;
  }
}
