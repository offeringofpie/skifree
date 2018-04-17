import Obstacle from '../Obstacle';

const sprite = [
  {
    name: 'snow',
    x: 901,
    y: 353,
    width: 96,
    height: 32,
    flipped: 0
  }
];

export default class SnowMedium extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = 0;
  }
}
