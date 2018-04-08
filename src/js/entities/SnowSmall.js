import Obstacle from './Obstacle';

const sprite = [
  {
    name: 'snow',
    x: 831,
    y: 368,
    width: 63,
    height: 16,
    flipped: 0
  }
];

export default class SnowSmall extends Obstacle {
  constructor(...args) {
    super(...args);
    this.sprite = sprite;
    this.direction = 0;
  }
}
